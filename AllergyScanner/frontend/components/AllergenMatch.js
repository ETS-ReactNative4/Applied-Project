import React from 'react';

export function MatchAllergens(allergenData, allergenString) {
      let array = [];
      array = AllergensString(allergenString);
      
      const allergenMatches = findAllergenMatches(allergenData, array);
      return allergenMatches;
  }
  
  function AllergensString(allergenString) {
      let allergens = [];
    allergens = allergenString.replace('(en)', '')
    
    const allergenArray = [...new Set(allergens.split(", "))]
      return allergenArray;
      
  }

  function findAllergenMatches(allergenData, array) {
    let matches = [];
     //console.log(` ${array}`)
    for (const allergen in allergenData) {
        if(allergenData[allergen] !== 0) {
            
            for (var i = 0; i < array.length; i++) {
              {allergenData.map(({ title,key }) => (
                <p key={title}></p>
                ))
                
                if (array[i].includes(allergenData[allergen].title)) {
                  
                    let match = allergenData[allergen].title;
                    match.replace(/["]+/g, (c) => c)
                    matches.push(match);
                     
                    }
            } }
            
        }
    }
    return matches;
  }

  


  
 

 