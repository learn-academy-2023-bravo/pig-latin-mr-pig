import React, { useState } from 'react'
import './App.css'
import butcherPigImage from './assets/butcherPig.jpeg'

const App = () => {
	// ACTION ITEM: to make the development process easier there are some preassigned words in the input field, when you are ready for your full user experience delete the test words passed to useState and pass an empty string
	const [userInput, setUserInput] = useState('')
	const [inputTranslated, setInputTranslated] = useState('')

	// ACTION ITEM: the "myPigLatinCodeHere" function is where you will put your logic to translate the sentence entered by the user into Pig Latin
	const myPigLatinCodeHere = () => {
		// NO MODIFICATION NEEDED: the variable "arrayOfUserInput" will contain the text input from the user split into an array of words
		const arrayOfUserInput = userInput.split(' ')
		console.log('arrayOfUserInput:', arrayOfUserInput)

		// NO MODIFICATION NEEDED: now that we have an array of words, we can map over the array and look at each word
		const translatedWordsArray = arrayOfUserInput.map((eachWord) => {
			console.log('eachWord:', eachWord)

			// NO MODIFICATION NEEDED: this code will look at each word and identify the vowels
			const vowelsArray = eachWord.split('').filter((vowel) => {
				return (
					vowel === 'a' ||
					vowel === 'e' ||
					vowel === 'i' ||
					vowel === 'o' ||
					vowel === 'u'
				)
			})
			console.log('vowelsArray:', vowelsArray)

			// ACTION ITEM: your Pig Latin logic goes here!

			// if word is capitalized then set capitalized to true
			let capitalized = false

			if (eachWord.charAt(0) === eachWord.charAt(0).toUpperCase()) {
				capitalized = true
			}

			eachWord = eachWord.toLowerCase()

			const vowels = ['a', 'e', 'i', 'o', 'u']

			const punc = ['.', '!', '?', ',']

			const indexOfPunctuation = eachWord.split('').findIndex((value) => {
				if (punc.includes(value)) {
					return true
				}
			})

			const punctuation = eachWord.charAt(indexOfPunctuation)
			eachWord = eachWord.replace(punctuation, '')

			if (vowels.includes(eachWord.charAt(0))) {
				eachWord = eachWord.concat('way')
			} else {
				// qu words
				if (eachWord.includes('qu')) {
					let newWord = eachWord.split('qu')
					eachWord = newWord[1].concat('qu').concat(newWord[0]).concat('ay')
				} else {
					// if word contains y and not vowel
					if (
						eachWord.includes('y') &&
						eachWord.split('').every((letter) => !vowels.includes(letter))
					) {
						let newWord = eachWord.split('y')

						eachWord = 'y'.concat(newWord[0]).concat('ay')
					} else {
						// words that have one or more consonats
						const indexOfFirstVowel = eachWord.split('').findIndex((value) => {
							if (vowels.includes(value)) {
								return true
							}
						})

						let middleSection = eachWord.slice(indexOfFirstVowel)
						let firstSection = eachWord.substring(0, indexOfFirstVowel)

						eachWord = middleSection.concat(firstSection).concat('ay')
					}
				}
			}

			// if word was capitalized then capitalize first letter
			if (capitalized) {
				eachWord = eachWord.charAt(0).toUpperCase().concat(eachWord.slice(1))
			}

			// add punctuation to end of word
			eachWord = eachWord.concat(punctuation)

			// ACTION ITEM: this return will be the output of your Pig Latin'd code
			return eachWord
		})

		// NO MODIFICATION NEEDED: once the code has been modified it gets joined from an array back to a string
		const translatedWords = translatedWordsArray.join(' ')
		console.log('translatedWords:', translatedWords)

		// if user inputs any numbers display 'unable to translate'
		const containsNum = translatedWordsArray.some((word) => {
			return word.split('').some((letter) => {
				if (!isNaN(letter)) {
					return true
				}
			})
		})

		if (containsNum) {
			setInputTranslated('Can not process numbers')
		} else {
			// NO MODIFICATION NEEDED: this will update the inputTranslated variable in state
			setInputTranslated(translatedWords)
		}
	}

	// ACTION ITEM: this method restarts the game by setting the original state, when you are ready for your full user experience delete the test words in setUserInput and pass an empty string
	const restartGame = () => {
		setUserInput('')
		setInputTranslated('')
	}

	// NO MODIFICATION NEEDED: this method prevents React from refreshing the page unnecessarily
	const setUpPreventDefault = (e) => {
		e.preventDefault()
		myPigLatinCodeHere()
	}

	// NO MODIFICATION NEEDED: this method takes the value of the input and saves it in state
	const handleInput = (e) => {
		setUserInput(e.target.value)
	}

	return (
		<div className="page-container">
			<div className="body-container">
				<h1>Pig Latin Translator</h1>
				<img
					src={butcherPigImage}
					alt="pig with butcher cut names in pig latin"
					className="butcher-pig-image"
				/>

				<div className="input-section">
					<h4>Enter phrase to be translated:</h4>
					<input
						type="text"
						className="user-input"
						onChange={handleInput}
						value={userInput}
					/>
					<br />
					<button onClick={setUpPreventDefault} className="primary">
						Submit
					</button>
					<button onClick={restartGame}>Clear</button>
				</div>
				<p>{inputTranslated}</p>
			</div>
			<footer>&copy; 2022 | Coded by: Jose & Raymond</footer>
		</div>
	)
}

export default App
