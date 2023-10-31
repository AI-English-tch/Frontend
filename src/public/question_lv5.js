const questions = [
    {
        title: 'hair on your upper lip',
        answer: ['gown', 'maid', 'mustache', 'paradise', 'pastry', 'vinegar'],
        correctAnswer: 'mustache'
    },
    {
        title: 'perfect place',
        answer: ['gown', 'maid', 'mustache', 'paradise', 'pastry', 'vinegar'],
        correctAnswer: 'paradise'
    },
    {
        title: 'small baked food',
        answer: ['gown', 'maid', 'mustache', 'paradise', 'pastry', 'vinegar'],
        correctAnswer: 'pastry'
    },
    {
        title: 'container for cut flowers',
        answer: ['asthma', 'chord', 'jockey', 'monk', 'rectangle', 'vase'],
        correctAnswer: 'vase'
    },
    {
        title: 'group of musical notes that are played at the same time',
        answer: ['asthma', 'chord', 'jockey', 'monk', 'rectangle', 'vase'],
        correctAnswer: 'chord'
    },
    {
        title: 'shape with two long and two short sides',
        answer: ['asthma', 'chord', 'jockey', 'monk', 'rectangle', 'vase'],
        correctAnswer: 'rectangle'
    },
    {
        title: 'green fruit',
        answer: ['batch', 'dentist', 'hum', 'lime', 'pork', 'scripture'],
        correctAnswer: 'lime'
    },
    {
        title: 'low, constant sound',
        answer: ['batch', 'dentist', 'hum', 'lime', 'pork', 'scripture'],
        correctAnswer: 'hum'
    },
    {
        title: 'meat from pigs',
        answer: ['batch', 'dentist', 'hum', 'lime', 'pork', 'scripture'],
        correctAnswer: 'pork'
    },
    {
        title: 'liquid that is made to smell nice',
        answer: [
            'amnesty',
            'claw',
            'earthquake',
            'perfume',
            'sanctuary',
            'wizard'
        ],
        correctAnswer: 'perfume'
    },
    {
        title: 'man who has magical powers',
        answer: [
            'amnesty',
            'claw',
            'earthquake',
            'perfume',
            'sanctuary',
            'wizard'
        ],
        correctAnswer: 'wizard'
    },
    {
        title: 'safe place',
        answer: [
            'amnesty',
            'claw',
            'earthquake',
            'perfume',
            'sanctuary',
            'wizard'
        ],
        correctAnswer: 'sanctuary'
    },
    {
        title: 'height',
        answer: [
            'altitude',
            'diversion',
            'hemisphere',
            'pirate',
            'robe',
            'socket'
        ],
        correctAnswer: 'altitude'
    },
    {
        title: 'kind of clothing',
        answer: [
            'altitude',
            'diversion',
            'hemisphere',
            'pirate',
            'robe',
            'socket'
        ],
        correctAnswer: 'robe'
    },
    {
        title: 'person who attacks ships',
        answer: [
            'altitude',
            'diversion',
            'hemisphere',
            'pirate',
            'robe',
            'socket'
        ],
        correctAnswer: 'pirate'
    },
    {
        title: 'announce',
        answer: ['applaud', 'erase', 'jog', 'intrude', 'notify', 'wrestle'],
        correctAnswer: 'notify'
    },
    {
        title: 'enter without permission',
        answer: ['applaud', 'erase', 'jog', 'intrude', 'notify', 'wrestle'],
        correctAnswer: 'intrude'
    },
    {
        title: 'remove',
        answer: ['applaud', 'erase', 'jog', 'intrude', 'notify', 'wrestle'],
        correctAnswer: 'erase'
    },
    {
        title: 'cut or tear into small pieces',
        answer: ['bribe', 'expire', 'immerse', 'meditate', 'persecute', 'shred'],
        correctAnswer: 'shred'
    },
    {
        title: 'end',
        answer: ['bribe', 'expire', 'immerse', 'meditate', 'persecute', 'shred'],
        correctAnswer: 'expire'
    },
    {
        title: 'think deeply',
        answer: ['bribe', 'expire', 'immerse', 'meditate', 'persecute', 'shred'],
        correctAnswer: 'meditate'
    },
    {
        title: 'catch fire',
        answer: ['commemorate', 'growl', 'ignite', 'pierce', 'renovate', 'swap'],
        correctAnswer: 'ignite'
    },
    {
        title: 'exchange',
        answer: ['commemorate', 'growl', 'ignite', 'pierce', 'renovate', 'swap'],
        correctAnswer: 'swap'
    },
    {
        title: 'go into or through something',
        answer: ['commemorate', 'growl', 'ignite', 'pierce', 'renovate', 'swap'],
        correctAnswer: 'pierce'
    },
    {
        title: 'calm and quiet',
        answer: ['bald', 'eternal', 'imperative', 'lavish', 'moist', 'tranquil'],
        correctAnswer: 'tranquil'
    },
    {
        title: 'having no hair',
        answer: ['bald', 'eternal', 'imperative', 'lavish', 'moist', 'tranquil'],
        correctAnswer: 'bald'
    },
    {
        title: 'slightly wet',
        answer: ['bald', 'eternal', 'imperative', 'lavish', 'moist', 'tranquil'],
        correctAnswer: 'moist'
    },
    {
        title: 'not dangerous',
        answer: [
            'diesel',
            'incidental',
            'mandatory',
            'prudent',
            'superficial',
            'tame'
        ],
        correctAnswer: 'tame'
    },
    {
        title: 'required',
        answer: [
            'diesel',
            'incidental',
            'mandatory',
            'prudent',
            'superficial',
            'tame'
        ],
        correctAnswer: 'mandatory'
    },
    {
        title: 'using good judgment',
        answer: [
            'diesel',
            'incidental',
            'mandatory',
            'prudent',
            'superficial',
            'tame'
        ],
        correctAnswer: 'prudent'
    }
]
// let obj = []
// for (let i = 0; i < questions.length; i++) {
//     let oobj = {
//         title: "",
//         answer: [],
//         correctAnswer: ""
//     }
//     oobj.title = questions[i].title.substr(questions[i].title.indexOf(".") + 1).trim();
//     oobj.answer = qu(questions[i].answer)
//     oobj.correctAnswer = qu(questions[i].answer)[correctAnswer[i]]
//     obj.push(oobj)
// }
// console.log(obj)
//
//
// function qu(arr) {
//     let arry = []
//     for (let j = 0; j < arr.length; j++) {
//         arry.push(arr[j].substr(2).trim())
//     }
//     return arry
// }

export default {
    questions
}
