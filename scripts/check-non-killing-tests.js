#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const REPORT_PATH = "public/stryker-report.json";

function analyzeStrykerReport() {
	console.log("🔍 Analyse du rapport Stryker...\n");

	if (!fs.existsSync(REPORT_PATH)) {
		console.error("❌ Rapport Stryker non trouvé:", REPORT_PATH);
		console.log("💡 Lancez d'abord: npm run build");
		process.exit(1);
	}

	try {
		const reportContent = fs.readFileSync(REPORT_PATH, "utf8");
		const report = JSON.parse(reportContent);

		console.log("📊 Statistiques du rapport:");
		const filesArray = Object.values(report.files || {});
		console.log(`   - Fichiers analysés: ${filesArray.length}`);

		const totalMutants = filesArray.reduce(
			(total, file) => total + (file.mutants?.length || 0),
			0,
		);
		console.log(`   - Mutants totaux: ${totalMutants}`);

		const survivedMutants = [];
		const allTestIds = new Set();
		const allKillingTestIds = new Set();

		// Parcourir testFiles directement et créer un map des tests
		const testMap = new Map();
		if (report.testFiles) {
			Object.entries(report.testFiles).forEach(([testFilePath, testFile]) => {
				if (testFile.tests) {
					testFile.tests.forEach((test) => {
						allTestIds.add(test.id);
						testMap.set(test.id, {
							name: test.name,
							file: testFilePath,
						});
					});
				}
			});
		}

		// Parcourir tous les mutants pour récupérer les IDs des tests qui tuent
		filesArray.forEach((file) => {
			if (file.mutants) {
				file.mutants.forEach((mutant) => {
					if (mutant.status === "Survived") {
						survivedMutants.push(mutant);
					}
					if (mutant.status === "Killed" && mutant.killedBy) {
						// Un mutant peut être tué par plusieurs tests
						mutant.killedBy.forEach((killingTest) => {
							allKillingTestIds.add(killingTest);
						});
					}
				});
			}
		});

		console.log(`   - Mutants survivants: ${survivedMutants.length}`);
		console.log(`   - Tests identifiés: ${allTestIds.size}`);
		console.log(`   - Tests qui tuent: ${allKillingTestIds.size}\n`);

		const testKillCount = new Map();

		filesArray.forEach((file) => {
			if (file.mutants) {
				file.mutants.forEach((mutant) => {
					if (mutant.status === "Killed" && mutant.killedBy) {
						mutant.killedBy.forEach((killingTestId) => {
							testKillCount.set(
								killingTestId,
								(testKillCount.get(killingTestId) || 0) + 1,
							);
						});
					}
				});
			}
		});

		const nonKillingTests = Array.from(allTestIds).filter(
			(testId) => !testKillCount.has(testId) || testKillCount.get(testId) === 0,
		);

		console.log("\n📊 COMPARAISON:");
		console.log(`   - Nombre total de tests: ${allTestIds.size}`);
		console.log(`   - Nombre de tests qui tuent: ${allKillingTestIds.size}`);
		console.log(`   - Tests non-killing: ${nonKillingTests.length}`);

		if (nonKillingTests.length > 0) {
			console.log("\n🚨 TESTS NON-KILLING DÉTECTÉS:");
			console.log("   Ces tests ne tuent aucun mutant:\n");

			nonKillingTests.forEach((testId) => {
				const killCount = testKillCount.get(testId) || 0;
				const testInfo = testMap.get(testId);
				const testName = testInfo ? testInfo.name : "Nom inconnu";
				const testFile = testInfo ? testInfo.file : "Fichier inconnu";
				console.log(
					`   ❌ Test ID: ${testId} (tue ${killCount} mutant${killCount > 1 ? "s" : ""})`,
				);
				console.log(`      📝 Nom: ${testName}`);
				console.log(`      📁 Fichier: ${testFile}\n`);
			});

			console.log(`\n📊 Résumé:`);
			console.log(`   - Tests non-killing: ${nonKillingTests.length}`);
			console.log(
				`   - Tests efficaces: ${allTestIds.size - nonKillingTests.length}`,
			);
			console.log(
				`   - Taux d'efficacité: ${Math.round(((allTestIds.size - nonKillingTests.length) / allTestIds.size) * 100)}%`,
			);

			console.log("\n💡 Recommandations:");
			console.log("   - Vérifiez que ces tests couvrent bien le code");
			console.log("   - Ajoutez des assertions plus spécifiques");
			console.log("   - Testez des cas limites supplémentaires");

			console.log("\n❌ ÉCHEC: Des tests non-killing ont été détectés");
			process.exit(1);
		} else {
			console.log("\n✅ SUCCÈS: Tous les tests tuent au moins un mutant");
			console.log(
				`📊 Taux d'efficacité: 100% (${allTestIds.size} tests efficaces)`,
			);
			process.exit(0);
		}
	} catch (error) {
		console.error("❌ Erreur lors de l'analyse du rapport:", error.message);
		process.exit(1);
	}
}

analyzeStrykerReport();
