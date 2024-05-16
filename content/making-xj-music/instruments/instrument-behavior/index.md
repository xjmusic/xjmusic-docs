+++
title = "Instrument Behavior"
weight = 3
description = "Different Types and Modes of instruments have unique purposes and behaviors"
+++

Different Types and Modes of instruments have unique purposes and behaviors.

Option A, is to tag audios with a single chord symbol (ie Cmaj7, Emin7b5) which is itself a shorthand for a list of notes (C, E, G, B and E, G, Bb, D for these examples)

With some clever voicing list tricks you could have a lot of freedom with this route.  For example if you wrote a voicing list that included both Fmaj7 and Amin7 you would be outlining Fmaj7/9

The more complicated and versatile route, Option B, is what you're saying—tagging audios with comma-separated lists of notes and having XJ cross-reference those with Main Program voicing lists to choose audios.

I think both will be useful, but to me the chord symbol tagging seems like a faster route to get multi-note audio happening because it's the same process as the current single-note tagging. I could be underestimating what’s going on currently though

Theoretically, option B is closer to what exists today, but that's not an obstacle.

I believe that there is a simple formula to tell us whether Option A or Option B yields more freedom a.k.a. modularity a.k.a. less work for more payoff.

Starting with Template Analysis (soon to be built) we can see how many different chords are present in all the main programs of the given template
(For each type of instrument independently?) Calculate the relative complexity of using Chord-based (option A)  or Note-based (option B) audio
Chord-based complexity = How many different audios would be required to cover all the chords present in all main programs
Note-based complexity = How many different audios would be required to cover all the voicing lists present in all main programs
I suspect the answer (A vs B) varies between templates and instrument types
