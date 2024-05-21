+++
categories = ["XJ-music-Design-and-Theory"]
title = "Instrument Properties"
tags = ["instrument", "properties", "settings", "parameters"]
+++

In the top header of an instrument are included properties that apply to the entire instrument, such as names, memes, type, mode, state, and volume.

| Instrument Property | Description |
|---------------------|-------------|
|**Name**|The name of the audio file. This defaults to the filename of the audio after importing but can be changed in the audio editor menu.|
|**Event**|Determines the type of instrument audio event that the chosen audio will be, which influences the mixing choices of a segment.|
|**Volume**|This value is a floating point integer that sets the volume of the chosen audio. 0.0 is completely silent and 1.0 is the original volume of the imported audio file. The volume value can be increased beyond 1.0 and its original volume, for example, an audio set to 2.0 will be twice as loud as the original file.|
|**Intensity**|A floating integer from 0.0 to 1.0 that determines the intensity level at which the audio will get introduced into the overall mix in a segment.|
|**Tones**|This value sets the note for the chosen audio. It can be a single note or chord.|
|**Tempo**|Sets the audio’s tempo in beats per minute.|
|**Transient**|A floating integer that determines in measurements of seconds where the chosen audio will be starting from when its event is slated to trigger. For example, the default transient offset is 0.0, indicating that the audio will start playing at the beginning of its file when triggered. A transient offset of 0.5 will include a pre-roll of 0.5 seconds and be that far into the audio when previously it would just be starting.|
|**Loop Beats**|An integer that determines the length of a given audio, measured in bars.|

{{% notice style="tip" title= "Pro Tip"%}}
The buttons on each row can be used
to **Edit** or **Destroy** that Audio.
![Instrument Properties Buttons](instrument-properties-buttons.png){{% /notice %}}
