import React from 'react'

// exported function to match allergens after scan
export function MatchAllergens(allergenData, allergenString) {
  let array = []
  array = AllergensString(allergenString)

  const allergenMatches = findAllergenMatches(allergenData, array)
  return allergenMatches
}

function AllergensString(allergenString) {
  let allergens = []
  // remove the 'en:' prefix from allergens
  allergens = allergenString.replace('en:', '')
  // allergens are passed as a string so split words into array
  const allergenArray = [...new Set(allergens.split(', '))]
  return allergenArray
}

// function to find matches
function findAllergenMatches(allergenData, array) {
  let matches = []
  // for loop to check for every allergen found in allergenData
  for (const allergen in allergenData) {
    // if allergens aren't empty
    if (allergenData[allergen] !== 0) {
      // Getting the title of allergens from allergenData
      for (var i = 0; i < array.length; i++) {
        {
          allergenData.map(({ title, key }) => <p key={title}></p>)
          // if the product you are checking includes the title of the allergen inside it
          if (
            array[i]
              .toLowerCase()
              .includes(allergenData[allergen].title.toLowerCase())
          ) {
            let match = allergenData[allergen].title

            match.replace(/["]+/g, (c) => c)
            // push the reults inside match array
            matches.push(match)
          }
        }
      }
    }
  }
  return matches
}
