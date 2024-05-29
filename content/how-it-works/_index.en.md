+++
archetype = "chapter"
title = "How it Works"
weight = 2
+++

The [XJ music system](#system) includes the [XJ music workstation](#workstation), a DAW dedicated to preparing dynamic video game music and the [XJ music engine](#engine) to integrate the product within your game audio system.

## System

XJ utilizes a versatile template system that accepts various inputs, such as audio stems, programs, and instruments from many libraries.

XJ's playback engine is more complex than it seems. The engine meticulously reads the content and constructs an ongoing sequence of segments. Each segment, unique in its timeline placement, consists of all the content employed to forge it.

Creating a segment requires several elements. Initially, you will need [**Macro Programs,**](/making-xj-music/programs/types-of-programs/) which are comparable to the sequence of songs a DJ would pick to play one after another. Following this, you will need [**Main Programs**](/making-xj-music/programs/types-of-programs/) - these are analogous to the individual pieces in a DJ's set, complete with chord progressions and specific voicings for each instrument in the song.

As the XJ moves through the creation process, it seeks out [**Beat Programs.**](/making-xj-music/programs/types-of-programs/) These programs house a collection of drum events that construct the underlying rhythm of the piece. XJ further scours for [**Detail Programs**](/making-xj-music/programs/types-of-programs/) that execute the voicings derived from the Main Programs, such as a bassline or stab pattern.

To fully realize the sonic details in the programs, XJ will search for the appropriate [**Instruments**](/making-xj-music/instruments/), each packed with audio content. For instance, a bass detail pattern from the Detail Program merges with bass voicings from the Main Program. This combination then aligns with a polyphonic bass-type instrument selected to curate and choose the final bass audio for the segment.

Some types of instrument audio are utilized formulaically within XJ, such as transition audio, percussion audio, and ambient audio. This creates a cohesive, dynamic, and robust sonic experience. Hence, XJ combines all these elements to generate a beautifully organized and harmonious audio segment, providing a user-friendly, intricate, and comprehensive approach to music creation.


## Workstation

The XJ music workstation is a digital audio workstation (DAW) that is dedicated to preparing dynamic video game music. It is the primary tool for creating music in the XJ music system.

[Install the XJ music workstation](https://xjmusic.com/download) on your computer to start creating dynamic music for video games.

View the source code in the [workstation](https://github.com/xjmusic/xjmusic/tree/main/workstation) package within the XJ music code repository.


## Engine

We've built the playback engine for XJ music as a shared library, which can be used in any language that can interface with C++. The engine is designed to be as simple as possible, and to be able to run on any platform.

View the source code in the [engine](https://github.com/xjmusic/xjmusic/tree/main/engine) package within the XJ music code repository.