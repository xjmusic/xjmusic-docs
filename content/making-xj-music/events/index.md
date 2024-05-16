+++
title = "Events"
weight = 2
description = "Sequence pattern events are used as a basis for selecting and assembling instrument audio"
+++

Automatic fabrication performs a search for matching Instrument Audio for the chosen Sequence Pattern Voice-Events. 
That is how an Audio is chosen inside of an Instrument, based on its Audio-Events.

We use a score-based stochastic model for event audio picking, as opposed to the marble bag model we use for choice.

## Drum Beat Events

The beat program is the center of the groove during any given main program. XJ chooses a single beat and keeps that beat for the duration of the main program.

It is important for percussive-type instruments to use the following standardized set of Event Names, which have far more influence on the outcome of percussive instrument-audio choice (than, for example, Event Notes).

Currently, we are using a very narrow set of events for in Beat-type programs.

We currently use these codes, for beat program events, and drum instrument audio events:

| CODE      | Name            |
|-----------|-----------------|
| `HIHATCL` | High Hat Closed |
| `HIHATOP` | High Hat Open   |
| `KICK`    | Kick            |
| `SNARE`   | Snare           |

## Drum Detail Events

In the future, XJ will also choose Detail programs having additional drum events to decorate the groove. These drum detail programs serve a similar function as percussion loop and transition instruments.

We expect that these events may include various types of drums or other percussion instruments.

We plan to use these codes for drum detail program events, and drum instrument audio events:

| CODE        | Name            |
|-------------|-----------------|
| `BONGOHI`   | Bongo High      |
| `BONGOLO`   | Bongo Low       |
| `BLOCKWDLO` | Block Wood Low  |
| `CABASA`    | Cabasa          |
| `CLAP`      | Clap            |
| `CLAVES`    | Claves          |
| `CONGALO`   | Conga Low       |
| `CONGAHIOP` | Conga High Open |
| `CONGAHIMU` | Conga High Mute |
| `COWBELL`   | Cowbell         |
| `CRASH`     | Cymbal Crash    |
| `CUICAOP`   | Cuica Open      |
| `CUICAMU`   | Cuica Mute      |
| `GONG`      | Gong            |
| `GUIROSH`   | Guiro Short     |
| `GUIROLN`   | Guiro Long      |
| `HIHATCL`   | High Hat Closed |
| `HIHATOP`   | High Hat Open   |
| `KICK`      | Kick            |
| `MARACAS`   | Maracas         |
| `RIDE`      | Cymbal Ride     |
| `SHAKER`    | Shaker          |
| `SLAP`      | Slap            |
| `SPLASH`    | Cymbal Splash   |
| `STICKSIDE` | Stick Side      |
| `TAMBOUR`   | Tambourine      |
| `TIMBALEHI` | Timbale High    |
| `TIMBALELO` | Timbale Low     |
| `TOMFLRHI`  | Tom Floor High  |
| `TOMFLRLO`  | Tom Floor Low   |
| `TOMHI`     | Tom High        |
| `TOMHIMID`  | Tom High Mid    |
| `TOMLO`     | Tom Low         |
| `TOMLOMID`  | Tom Low Mid     |
| `TRIANGMU`  | Triangle Mute   |
| `TRIANGOP`  | Triangle Open   |
| `VIBRASLAP` | Vibraslap       |

## Percussion Loops

Percussion Loops have an Instrument Type of Percussion, and an Instrument Mode of Loop.


They are assigned for each fabricated segment during percussion loop craft. It's going to be used to determine a target # of perc loops.


Assumed that one or more loops will be chosen for any segment— minimum and maximum are configured via template config. For each MP, setup delta arcs for N number of percussive loops.


Perc loop instrument behavior selects one audio per section. Consolidating audio with the same sound set under one instrument. Then setting the default length an audio stays in the stream to a full section rather than switching every 4 beats.


Percussive Loops can specify # beats in the instrument or audio editor.

## Loop Priority

Some Perc Loops are killer by themselves. In the case of house music, this might be a fully fleshed out 16x 16th notes of house locomotion, requiring only an added kick and snare to be complete. Let's call these `PRIMARY` perc loops.


Other Perc Loops are intended to be added on top of a stable base of Primary perc loops.


Other Perc. Loops are intended to support the known structure of the rhythm.


Based on the **intensity** value of any given perc loop and the current mix intensity, XJ will fade each perc loop into the mix.


