+++
title = "Instrument Modes"
tags = ["instrument", "modes", "types", "polyphonic", "chord", "loop", "drum"]
+++

### Chord-mode Instruments

A chord-mode instrument such as a Pad-type instrument will provide a single audio per chord. In that case each row (audio) in the instrument will use the tones column to store the chord. The event column is ignored.

When choosing instrument audio (from a chord-mode instrument) for the chords of a main program, XJ will prioritize (see: [**marble bag**](/making-xj-music/memes)) any available exact match. In lieu of an exact match, XJ will allow an acceptable substitute of the pre-slash description of a chord to a non-slash chord (e.g. “Eb/G” is an acceptable substitute for “Eb” and vice versa).

While the presence of voicings is used to make the decision "I'm going to look for a ___-type instrument" once XJ has arrived at the decision "I'm going to craft this ___-type chord-mode instrument now for this segment" there are zero references to voicing content. The content of the chord voicings is ignored. E.g. It’s possible to tell XJ to seek Pad instruments for a given main program even if the content of those voicings are all just “X” but it’s critical to understand the whole template you are composing. If the design of the template calls for both Note- and Chord-type instruments for a given instrument type, then it’s necessary to write whole voicings (comma-separated lists of notes voicing each chord) for interoperability.

For a table of XJ’s chord comprehension, see [**Chord Interpretation**](/making-xj-music/chords/)

## Event-mode Instruments

A polyphonic instrument such as a Bass-type instrument will provide a single audio per note. In that case each row (audio) in the instrument will use the tones column to store the note. The event column is ignored.

A Drum-type instrument will provide a single audio per drum event. In that case each row (audio) in the instrument will use the event column to store the event. The note column is ignored.

## Loop-mode Instruments

Audio in loop-mode plays through its total length continuously, repeating at the start of each Main Program selection in a segment.
