const pokeTypeApp = { //namespace object
    //This array of arrays holds the pokemon type chart (what type is supereffective/resists what type). Each subarray in typeChart contains values for a certain type, 1 if type is normaly damaged, 2 if supereffective, 0.5 if it resists, and 0 if a type is immune. 
    // In case you are not familiar with pokemon types https://pokemondb.net/type
    typeChart: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], //normal type (index 0)
        [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], //fire type (index 1)
        [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], //water type (index 2)
        [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1], //electric type (index 3)
        [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 1], //grass type (index 4)
        [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5, 1], //ice type (index 5)
        [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], //fighting type (index 6)
        [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0, 2], //poison type (index 7)
        [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2, 1], //ground type (index 8)
        [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5, 1], //flying type (index 9)
        [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5, 1], //psychic type (index 10)
        [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5, 0.5], //bug type (index 11)
        [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5, 1], //rock type (index 12)
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1], //ghost type (index 13)
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5, 0], //dragon type (index 14)
        [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 0.5], //dark type (index 15)
        [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5, 2], //steel type (index 16)
        [1, 0.5, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 1, 2, 2, 0.5, 1] //fairy type (index 17)
    ],
    //jquery shorthands for css classes of types
    $water: $('.water'),
    $fire: $('.fire'),
    $grass: $('.grass'),
    $fighting: $('.fighting'),
    $ghost: $('.ghost'),
    $dragon: $('.dragon'),
    $fairy: $('.fairy'),
    $poison: $('.poison'),
    $steel: $('.steel'),
    $normal: $('.normal'),
    $dark: $('.dark'),
    $flying: $('.flying'),
    $rock: $('.rock'),
    $ground: $('.ground'),
    $ice: $('.ice'),
    $electric: $('.electric'),
    $psychic: $('.psychic'),
    $bug: $('.bug'),

    //variables to change the text such as title and opening paragraph
    $title: $('.titleimg-container p'),
    $response: $('.response p'),
    $pokemon: $('#pokemon'),

    //variables to keep track of quiz mode
    numberOfquestions: 7,
    quizMode: false,
    quizCounter: 0,
    score: 0,
    answerKey: [],

    //keep music if music is on
    musicIsPlaying: false

};

pokeTypeApp.init = function () { // parse pokeType methods
    pokeTypeApp.chooseType();
    pokeTypeApp.convertJtypeToIndex();
    pokeTypeApp.convertIndexToJtype();
    pokeTypeApp.showMatchUp();
    pokeTypeApp.reset();
    pokeTypeApp.askQuestion();
    pokeTypeApp.askSuperQuestion();
    pokeTypeApp.askNotEffectiveQuestion();
    pokeTypeApp.askImmunityQuestion();
    pokeTypeApp.checkAnswer();
    pokeTypeApp.giveFeedBack();
    pokeTypeApp.playMusic();

}


pokeTypeApp.chooseType = function () {
    //jquery shorthand for button element
    const $btn = $('button');
    $btn.on('click', function () {
        // first remove any supereffective/resistances classes each time a user selets a new button
        pokeTypeApp.reset();
        let typeIndex = pokeTypeApp.convertJtypeToIndex($(this));

        if ($(this).is('.quiz')) {
            pokeTypeApp.playMusic();
            pokeTypeApp.reset();
            pokeTypeApp.quizCounter = 0;
            $(this).addClass('disabled');
            pokeTypeApp.quizMode = true;
            pokeTypeApp.score = 0;
            typeIndex = 1; //default value beacuse it was giving an error that it wasnt set if quiz was clicked
            pokeTypeApp.$response.text('Good Luck! When you click your answer, I will ask you the next question.')
        }

        if ($(this).is('.quiz')) {
            let source = "assets/Electric/0.png";
            pokeTypeApp.$pokemon.attr('src', source);
        } else {
            pokeTypeApp.changePokemon(typeIndex);
        }

        //assign the subArray corresponding to the type that was chosen by user
        let typeMatchup = pokeTypeApp.typeChart[typeIndex];

        //iterate over the subarray and add the superEffective (2) /Resistance (0.5 or 0) classes depending on the number in the array

        if (pokeTypeApp.quizCounter > 0 || pokeTypeApp.quizMode != true)
            for (let i = 0; i < 18; i++) {
                if (typeMatchup[i] != 1) {
                    pokeTypeApp.showMatchUp(i, typeMatchup[i]);
                }
            }

        if (pokeTypeApp.quizMode == true) {
            if (pokeTypeApp.quizCounter > 0) { //if we have answered the first question, check the answer
                if (pokeTypeApp.quizCounter < pokeTypeApp.numberOfquestions) {
                    //if the answer is correct increment the score and question number
                    pokeTypeApp.giveFeedBack(typeIndex);
                    pokeTypeApp.answerKey = [];
                    pokeTypeApp.askQuestion();
                    pokeTypeApp.quizCounter++;
                } else {
                    pokeTypeApp.giveFeedBack(typeIndex);
                    let numberOfquestions = pokeTypeApp.numberOfquestions;
                    pokeTypeApp.$response.text(pokeTypeApp.$response.text() + " Test is over! You got " + pokeTypeApp.score + " out of " + numberOfquestions + " correct! " + pokeTypeApp.gradeTrainer() + " Feel free to take a redo anytime!");
                    pokeTypeApp.$title.text('Welcome Trainer!');
                    pokeTypeApp.quizMode = false;
                    $('.quiz').removeClass('disabled');
                }
            } else {
                //if its the very first question, clear the answerkey, and ask a new question
                pokeTypeApp.answerKey = [];
                pokeTypeApp.askQuestion();
                pokeTypeApp.quizCounter++;
            }
        }



    });
}

//function that takes a Jquery object representing a type and converts it to a corresponding array index. I could not get a switch statement to work by accepting Jquery objects.
pokeTypeApp.convertJtypeToIndex = function (jType) {
    if ($(jType).is('.normal')) {
        return 0;
    }
    if ($(jType).is('.fire')) {
        return 1;
    }
    if ($(jType).is('.water')) {
        return 2;
    }
    if ($(jType).is('.electric')) {
        return 3;
    }
    if ($(jType).is('.grass')) {
        return 4;
    }
    if ($(jType).is('.ice')) {
        return 5;
    }
    if ($(jType).is('.fighting')) {
        return 6;
    }
    if ($(jType).is('.poison')) {
        return 7;
    }
    if ($(jType).is('.ground')) {
        return 8;
    }
    if ($(jType).is('.flying')) {
        return 9;
    }
    if ($(jType).is('.psychic')) {
        return 10;
    }
    if ($(jType).is('.bug')) {
        return 11;
    }
    if ($(jType).is('.rock')) {
        return 12;
    }
    if ($(jType).is('.ghost')) {
        return 13;
    }
    if ($(jType).is('.dragon')) {
        return 14;
    }
    if ($(jType).is('.dark')) {
        return 15;
    }
    if ($(jType).is('.steel')) {
        return 16;
    }
    if ($(jType).is('.fairy')) {
        return 17;
    }
}

//function that takes a typeIndex representing an arrayIndex and converts it to a corresponding Jquery object (jType )OR a string (str) depending on the parameter given.
pokeTypeApp.convertIndexToJtype = function (typeIndex, format) {
    switch (typeIndex) {
        case 0:
            if (format == "jType") {
                return pokeTypeApp.$normal;
            } else {
                return "Normal";
            }
            break;
        case 1:
            if (format == "jType") {
                return pokeTypeApp.$fire;
            } else {
                return "Fire";
            }
            break;
        case 2:
            if (format == "jType") {
                return pokeTypeApp.$water;
            } else {
                return "Water";
            }
            break;
        case 3:
            if (format == "jType") {
                return pokeTypeApp.$electric;
            } else {
                return "Electric";
            }
            break;
        case 4:
            if (format == "jType") {
                return pokeTypeApp.$grass;
            } else {
                return "Grass";
            }
            break;
        case 5:
            if (format == "jType") {
                return pokeTypeApp.$ice;
            } else {
                return "Ice";
            }
            break;
        case 6:
            if (format == "jType") {
                return pokeTypeApp.$fighting;
            } else {
                return "Fighting";
            }
            break;
        case 7:
            if (format == "jType") {
                return pokeTypeApp.$poison;
            } else {
                return "Poison";
            }
            break;
        case 8:
            if (format == "jType") {
                return pokeTypeApp.$ground;
            } else {
                return "Ground";
            }
            break;
        case 9:
            if (format == "jType") {
                return pokeTypeApp.$flying;
            } else {
                return "Flying";
            }
            break;
        case 10:
            if (format == "jType") {
                return pokeTypeApp.$psychic;
            } else {
                return "Psychic";
            }
            break;
        case 11:
            if (format == "jType") {
                return pokeTypeApp.$bug;
            } else {
                return "Bug";
            }
            break;
        case 12:
            if (format == "jType") {
                return pokeTypeApp.$rock;
            } else {
                return "Rock";
            }
            break;
        case 13:
            if (format == "jType") {
                return pokeTypeApp.$ghost;
            } else {
                return "Ghost";
            }
            break;
        case 14:
            if (format == "jType") {
                return pokeTypeApp.$dragon;
            } else {
                return "Dragon";
            }
            break;
        case 15:
            if (format == "jType") {
                return pokeTypeApp.$dark;
            } else {
                return "Dark";
            }
            break;
        case 16:
            if (format == "jType") {
                return pokeTypeApp.$steel;
            } else {
                return "Steel";
            }
            break;
        case 17:
            if (format == "jType") {
                return pokeTypeApp.$fairy;
            } else {
                return "Fairy";
            }
            break;
    }
}

//function that removes all css classes that puts a border from all types
pokeTypeApp.reset = function () {
    for (let i = 0; i < 18; i++) {
        let jType = pokeTypeApp.convertIndexToJtype(i, "jType");
        jType.removeClass('superEffective');
        jType.removeClass('notEffective');
        jType.removeClass('immunity');
    }
}

//function that takes a type and adds css classes depending on its matchup.
//it will add superEffective, notEffective, or immunity when matchUp = 2, 0.5, 0 respectfully 
pokeTypeApp.showMatchUp = function (typeIndex, matchUp) {
    let jType = '';
    if (matchUp == 0) {
        jType = pokeTypeApp.convertIndexToJtype(typeIndex, "jType");
        jType.addClass('immunity');
    }
    if (matchUp == 0.5) {
        jType = pokeTypeApp.convertIndexToJtype(typeIndex, "jType");
        jType.addClass('notEffective');
    }
    if (matchUp == 2) {
        jType = pokeTypeApp.convertIndexToJtype(typeIndex, "jType");
        jType.addClass('superEffective');
    }
}

//this function will handle asking a random question related to pokemon types
pokeTypeApp.askQuestion = function () {
    if (pokeTypeApp.quizMode == true) {

        let questionType = Math.floor((Math.random() * 4));
        switch (questionType) {
            case 0:
                pokeTypeApp.askSuperQuestion();
                break;
            case 1:
                pokeTypeApp.askNotEffectiveQuestion();
                break;
            case 2:
                pokeTypeApp.askImmunityQuestion();
                break;
            case 3:
                pokeTypeApp.askImmunityQuestion();
                break;
        }
    }
}

//asks a question regarding what a type is supereffective against
pokeTypeApp.askSuperQuestion = function () {
    //only run if quiz mode is on some reason without this if it still runs
    if (pokeTypeApp.quizMode == true) {
        //normal types are not supereffective against anything so ignore the number 0 and return a string of the type randomly chosen
        let typeIndex = Math.floor((Math.random() * 16) + 1);
        let type = pokeTypeApp.convertIndexToJtype(typeIndex, "str");
        //to find the answer to this question, find the type and loop through the typeChart array anytime there is a 2 it means it is supereffective against that type
        let typeArray = pokeTypeApp.typeChart[typeIndex];
        for (let i = 0; i < 18; i++) {
            if (typeArray[i] == 2) {
                pokeTypeApp.answerKey.push(i);
            }
        }
        pokeTypeApp.$title.text(`Question ${pokeTypeApp.quizCounter + 1}, What type is ${type} supereffective against?`);
    }
}

//asks a question regarding what a type is noteffective against
pokeTypeApp.askNotEffectiveQuestion = function () {
    //only run if quiz mode is on some reason without this if it still runs
    if (pokeTypeApp.quizMode == true) {
        let typeIndex = Math.floor(Math.random() * 18);

        let type = pokeTypeApp.convertIndexToJtype(typeIndex, "str");
        let typeArray = pokeTypeApp.typeChart[typeIndex];
        for (let i = 0; i < 18; i++) {
            if (typeArray[i] == 0.5) {
                pokeTypeApp.answerKey.push(i);
            }
        }
        pokeTypeApp.$title.text(`Question ${pokeTypeApp.quizCounter + 1}, What type resists ${type}?`);
    }


}

//asks a question regarding what a type is immune against
pokeTypeApp.askImmunityQuestion = function () {
    //only run if quiz mode is on some reason without this if it still runs
    if (pokeTypeApp.quizMode == true) {
        //There are only 8 types with immunities against other types (normal, ground, flying, ghost, dark, steel, and fairy)
        let immunityRng = Math.floor(Math.random() * 7);
        let typeIndex = 0;

        switch (immunityRng) {
            case 0: //normal
                typeIndex = 0;
                break;
            case 1: //ground
                typeIndex = 8;
                break;
            case 2: //flying
                typeIndex = 9;
                break;
            case 3: //ghost
                typeIndex = 13;
                break;
            case 4: //dark
                typeIndex = 15;
                break;
            case 5: //steel
                typeIndex = 16;
                break;
            case 6: //fairy
                typeIndex = 17;
                break;
        }

        let type = pokeTypeApp.convertIndexToJtype(typeIndex, "str");
        let typeArray = pokeTypeApp.typeChart[typeIndex];
        for (let i = 0; i < 18; i++) {
            typeArray = pokeTypeApp.typeChart[i];
            if (typeArray[typeIndex] == 0) {
                pokeTypeApp.answerKey.push(i);
            }
        }
        pokeTypeApp.$title.text(`Question ${pokeTypeApp.quizCounter + 1}, What type does ${type} have an immunity against?`);
    }
}

pokeTypeApp.askSuperAgainstType = function () {
    let typeIndex = Math.floor(Math.random() * 18);
    let typeArray = pokeTypeApp.typeChart[typeIndex];
    for (let i = 0; i < 18; i++) {
        typeArray = pokeTypeApp.typeChart[i];
        if (typeArray[typeIndex] == 2) {
            pokeTypeApp.answerKey.push(i);
        }
    }
    pokeTypeApp.$title.text(`Question ${pokeTypeApp.quizCounter + 1}, What type is supereffective against ${type}?`);
}

pokeTypeApp.checkAnswer = function (typeIndex) {
    for (let i = 0; i < pokeTypeApp.answerKey.length; i++) {
        if (typeIndex == pokeTypeApp.answerKey[i]) {
            return true;
        }
    }
    return false;
}

//this function will check if an answer is correct, give positive feedback or show the answers if wrong
pokeTypeApp.giveFeedBack = function (theTypeIndex) {
    if (pokeTypeApp.quizMode == true) { //only run if quiz mode is on some reason without this if it still runs
        let typeIndex = theTypeIndex;
        let feedback = "";
        if (pokeTypeApp.checkAnswer(typeIndex)) {
            pokeTypeApp.score++;
            feedback = pokeTypeApp.positiveFeedBack();
            pokeTypeApp.$response.text(feedback);
        } else { //if its the wrong answer, show the player any possible answers
            //answers are stored in the property answer key as index numbers that
            //represent a type. To get the answer we convert the indexnumber back to a string using convertIndextoJtype function
            let correctAnswer = "The correct answer would have been: "; //initialize to the answer to empty string
            if (pokeTypeApp.answerKey.length == 1) { //if there is only one answer
                correctAnswer = pokeTypeApp.convertIndexToJtype(pokeTypeApp.answerKey[0], "str");
            } else { // if there is more than one answer, add "or" in the answer
                for (let i = 0; i < pokeTypeApp.answerKey.length; i++) {
                    if (i == (pokeTypeApp.answerKey.length - 1)) {
                        correctAnswer += " or " + pokeTypeApp.convertIndexToJtype(pokeTypeApp.answerKey[i], "str");
                    } else {
                        correctAnswer += " " + pokeTypeApp.convertIndexToJtype(pokeTypeApp.answerKey[i], "str");
                    }
                }
            }
            feedback = pokeTypeApp.constructiveFeedBack() + correctAnswer + ".";
            pokeTypeApp.$response.text(feedback);
        }
    }
}

pokeTypeApp.positiveFeedBack = function () { //function that gives a random positive response
    let rng = Math.floor(Math.random() * 3);
    positiveLine = "";
    switch (rng) {
        case 0:
            positiveLine = "Great Job! ";
            break;
        case 1:
            positiveLine = "Excellent! ";
            break;
        case 2:
            positiveLine = "Astounding! ";
            break;
    }
    return positiveLine;
}

pokeTypeApp.constructiveFeedBack = function () { //function that gives a random positive response
    let rng = Math.floor(Math.random() * 3);
    constructiveLine = "";
    switch (rng) {
        case 0:
            constructiveLine = "Not quite.. ";
            break;
        case 1:
            constructiveLine = "Sorry not it.. ";
            break;
        case 2:
            constructiveLine = "Nope..  ";
            break;
    }
    return constructiveLine;
}

//function that returns a string which is the final verdict based on quiz percentage results
pokeTypeApp.gradeTrainer = function () {
    let verdict = "";
    let grade = (pokeTypeApp.score / pokeTypeApp.numberOfquestions);

    if (grade == 1) {
        verdict = "You are a Pokemon Master!";
    } else if (grade > 0.8) {
        verdict = "Such a highly skilled trainer! I have high hopes for you!";
    } else if (grade > 0.6) {
        verdict = "Very good! Hone your skills to reach your potential!";
    } else if (grade > 0.4) {
        verdict = "Not bad rookie! You could use a little practice!";
    } else if (grade > 0.2) {
        verdict = "It's alright kiddo! Everyone starts from somewhere!";
    } else {
        verdict = "You really need to hit the books!";
    }
    return verdict;
}

//this function will randomly change the pokemon depending on what type the user selects
pokeTypeApp.changePokemon = function (typeIndex) {
    let type = typeIndex;
    let typeString = pokeTypeApp.convertIndexToJtype(type, "str");
    let rng = Math.floor(Math.random() * 4);
    let source = "assets/" + typeString + "/" + rng + ".png";
    pokeTypeApp.$pokemon.attr('src', source);
}

pokeTypeApp.playMusic = function () {
    $('#intro').get(0).play();
}

$(document).ready(function () {
    pokeTypeApp.init();

});


