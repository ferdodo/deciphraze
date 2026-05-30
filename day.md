# Day terminology

- `realDay`: the real calendar day given by `timeService`
- `forcedDay`: an optional day override, used for development, applied on top of `realDay`
- `currentDay`: the effective day used by the app; it is `forcedDay` when defined, otherwise `realDay`
- `gameDay`: the day key of the current game in `allGamesRepository`
