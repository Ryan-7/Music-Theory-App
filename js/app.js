"use strict";

var app = {
    keys: {
        cMaj: {
            name: "C Major",
            chords: ["C Major ", "D Minor ", "E Minor ", "F Major ", "G Major ", "A Minor ", "B Diminished"],
            notes: ["C", "D", "E", "F", "G", "A", "B"],
            file: "cMaj.mp3"
        },
        cSharpMaj: {
            name: "C# Major",
            chords: ["C# Major", "D# Minor", "E# Minor", "F# Major", "G# Major", "A# Minor", "B# Diminished"],
            notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
            file: "cSharpMaj.mp3"
        },

        dMaj: {
            name: "D Major",
            chords: ["D Major", "E Minor", "F# Minor", "G Major", "A Major", "B Minor", "C# Diminished"],
            notes: ["D", "E", "F#", "G", "A", "B", "C#"],
            file: "dMaj.mp3"
        },

        eFlatMaj: {
            name: "Eb Major",
            chords: ["Eb Major", "F Minor", "G Minor", "Ab Major", "Bb Major", "C Minor", "D Diminished"],
            notes: ["E", "F", "G", "Ab", "Bb", "C", "D"],
            file: "eFlatMaj.mp3"
        },

        eMaj: {
            name: "E Major",
            chords: ["E major", "F# Minor", "G# Minor", "A Major", "B Major", "C# Minor", "D# Diminished"],
            notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
            file: "eMaj.mp3"
        },

        fMaj: {
            name: "F Major",
            chords: ["F Major", "G Minor", "A Minor", "Bb Major", "C Major", "D Minor", "E Diminished"],
            notes: ["F", "G", "A", "Bb", "C", "D", "E"],
            file: "fMaj.mp3"
        },

        fSharpMaj: {
            name: "F# Major",
            chords: ["F# Major", "G# Minor", "A# Minor", "B Major", "C# Major", "D# Minor", "E# Diminished"],
            notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
            file: "fSharpMaj.mp3"
        },

        gMaj: {
            name: "G Major",
            chords: ["G Major", "A Minor", "B Minor", "C Major", "D Major", "E Minor", "F# Diminished"],
            notes: ["G", "A", "B", "C", "D", "E", "F#"],
            file: "gMaj.mp3"
        },

        aFlatMaj: {
            name: "Ab Major",
            chords: ["Ab Major", "Bb Minor", "C Minor", "Db Major", "Eb Major", "F Minor", "G Diminished"],
            notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "Gb"],
            file: "aFlatMaj.mp3"
        },

        aMaj: {
            name: "A Major",
            chords: ["A Major", " B Minor", "C# Minor", "D Major", "E Major", "F# Minor", "G# Diminished"],
            notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
            file: "aMaj.mp3"
        },

        bFlatMaj: {
            name: "Bb Major",
            chords: ["Bb Major", "C Minor", "D Minor", "Eb Major", "F Major", "G Minor", "A Diminished"],
            notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
            file: "bFlatMaj.mp3"
        },

        bMaj: {
            name: "B Major",
            chords: ["B Major", "C# Minor", "D# Minor", "E Major", "F# Major", "G# Minor", "A# Diminished"],
            notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
            file: "bMaj.mp3"
        }

    },

    cycle: -1,
    key: null,
    progressions: [[0, 4, 5, 3], [0, 4, 3, 4], [5, 4, 3, 4], [0, 5, 3, 4], [0, 3, 5, 4]],
    roman: ["I", "ii", "iii", "IV", "V", "vi", "VII"],
    backingTrackToggle: true,
    progressionsToggle: true,
    infoShow: true,
    homeNotesOn: true,
    tensionNotesOn: true,

    cacheDom: function cacheDom() {
        this.keyForm = document.getElementById("keyForm");
        this.selection = document.getElementById("keys");
        this.tools = document.getElementById("tools");
        this.notesInThisKey = document.getElementById("notesInThisKey");
        this.chordsInThisKey = document.getElementById("chordsInThisKey");
        this.audio = document.getElementById("audio");
        this.loadBackingTrack = document.getElementById("loadBackingTrack");
        this.backingTrack = document.getElementById("backingTrack");
        this.generate = document.getElementById("generate");
        this.commonProgressions = document.getElementById("commonProgressions");
        this.viewProgressions = document.getElementById("viewProgressions");
        this.info = document.getElementById("info");
        this.howToUse = document.getElementById("howToUse");
        this.improviseToggle = document.getElementById("improviseToggle");
        this.improvise = document.getElementById("improvise");
        this.highlight = document.getElementsByClassName("highlight");
        this.home = document.getElementsByClassName("home");
        this.tensionToggle = document.getElementById("tensionToggle");
        this.lowlight = document.getElementsByClassName("lowlight");
        this.nonTargetNotes = document.getElementById("tension");
        this.tension = document.getElementsByClassName("tension");
    },

    bindEvents: function bindEvents() {
        this.keyForm.onchange = this.checkSelection.bind(this);
        this.loadBackingTrack.onclick = this.revealBackingTrack.bind(this);
        this.generate.onclick = this.generateChords.bind(this);
        this.viewProgressions.onclick = this.revealProgressions.bind(this);
        this.howToUse.onclick = this.showInfo.bind(this);
        this.improvise.onclick = this.targetNotes.bind(this);
        this.nonTargetNotes.onclick = this.tensionNotes.bind(this);
    },

    checkSelection: function checkSelection() {
        if (this.selection.selectedIndex === 1) {
            this.key = this.keys.cMaj;
        } else if (this.selection.selectedIndex === 2) {
            this.key = this.keys.cSharpMaj;
        } else if (this.selection.selectedIndex === 3) {
            this.key = this.keys.dMaj;
        } else if (this.selection.selectedIndex === 4) {
            this.key = this.keys.eFlatMaj;
        } else if (this.selection.selectedIndex === 5) {
            this.key = this.keys.eMaj;
        } else if (this.selection.selectedIndex === 6) {
            this.key = this.keys.fMaj;
        } else if (this.selection.selectedIndex === 7) {
            this.key = this.keys.fSharpMaj;
        } else if (this.selection.selectedIndex === 8) {
            this.key = this.keys.gMaj;
        } else if (this.selection.selectedIndex === 9) {
            this.key = this.keys.aFlatMaj;
        } else if (this.selection.selectedIndex === 10) {
            this.key = this.keys.aMaj;
        } else if (this.selection.selectedIndex === 11) {
            this.key = this.keys.bFlatMaj;
        } else if (this.selection.selectedIndex === 12) {
            this.key = this.keys.bMaj;
        }
        this.chordNames();
        this.notesInKey();
        this.audioChange();
        this.cycle = -1;
        this.generateChords();
        this.populate();
    },

    populate: function populate() {
        this.notesInThisKey.classList.remove("hide");
        this.chordsInThisKey.classList.remove("hide");
    },

    chordNames: function chordNames() {
        for (var i = 0; i < 7; i++) {
            document.getElementById("chords-" + [i]).innerHTML = this.key.chords[i];
            document.getElementById("romanChords-" + [i]).innerHTML = this.roman[i];
        }
    },

    notesInKey: function notesInKey() {
        for (var i = 0; i < 7; i++) {
            document.getElementById("notes-" + [i]).innerHTML = this.key.notes[i];
        }
    },

    audioChange: function audioChange() {
        audioSource.src = "assets/music/" + this.key.file;
        audio.load();
    },

    revealBackingTrack: function revealBackingTrack() {
        if (this.backingTrackToggle) {
            this.backingTrack.classList.remove("hide");
            this.backingTrack.className += " animatedFast slideInLeft";
        } else {
            this.backingTrack.className += " hide";
        }
        this.backingTrackToggle = !this.backingTrackToggle;
    },

    generateChords: function generateChords() {
        if (this.cycle === this.progressions.length - 1) {
            this.cycle = 0;
        } else {
            this.cycle++;
        }
        for (var i = 0; i < 4; i++) {
            document.getElementById("chord-" + [i]).innerHTML = this.key.chords[this.progressions[this.cycle][i]];
            document.getElementById("roman-" + [i]).innerHTML = this.roman[this.progressions[this.cycle][i]];
        }
    },

    revealProgressions: function revealProgressions() {
        if (this.progressionsToggle) {
            this.generate.classList.remove("hide");
            this.generate.className += " animatedFast slideInLeft";
            this.commonProgressions.classList.remove("hide");
            this.commonProgressions.className += " animated fadeIn";
        } else {
            this.generate.className += " hide";
            this.commonProgressions.className += " hide";
        }
        this.progressionsToggle = !this.progressionsToggle;
    },

    showInfo: function showInfo() {
        if (this.infoShow) {
            this.info.classList.remove("hide");
        } else {
            this.info.className += " hide";
        }
        this.infoShow = !this.infoShow;
    },

    targetNotes: function targetNotes() {
        if (this.homeNotesOn) {
            for (var i = 0; i < this.highlight.length; i++) {
                this.highlight[i].className += " yellow";
            }
            for (var _i = 0; _i < this.home.length; _i++) {
                this.home[_i].classList.remove("hidden");
            }
            this.improviseToggle.className = "fa fa-toggle-on";
            this.homeNotesOn = !this.homeNotesOn;
        } else {
            for (var _i2 = 0; _i2 < this.highlight.length; _i2++) {
                this.highlight[_i2].classList.remove("yellow");
            }

            for (var _i3 = 0; _i3 < this.home.length; _i3++) {
                this.home[_i3].className += " hidden";
            }
            this.improviseToggle.className = "fa fa-toggle-off";
            this.homeNotesOn = !this.homeNotesOn;
        }
    },

    tensionNotes: function tensionNotes() {
        if (this.tensionNotesOn) {
            for (var i = 0; i < this.lowlight.length; i++) {
                this.lowlight[i].className += " white";
            }
            for (var _i4 = 0; _i4 < this.tension.length; _i4++) {
                this.tension[_i4].classList.remove("hidden");
            }
            this.tensionToggle.className = "fa fa-toggle-on";
            this.tensionNotesOn = !this.tensionNotesOn;
        } else {
            for (var _i5 = 0; _i5 < this.lowlight.length; _i5++) {
                this.lowlight[_i5].classList.remove("white");
            }
            for (var _i6 = 0; _i6 < this.tension.length; _i6++) {
                this.tension[_i6].className += " hidden";
            }
            this.tensionToggle.className = "fa fa-toggle-off";
            this.tensionNotesOn = !this.tensionNotesOn;
        }
    },

    init: function init() {
        this.cacheDom();
        this.bindEvents();
    }

};

app.init();