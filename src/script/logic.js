// Formatting and Parsing Logic

import { Fraction } from "fractional";


export const formatCount = (count) => {
    if (count) {
      // count  = 2.5;
      const newCount = Math.round(count * 10000) / 10000;
      const [int, dec] = newCount
        .toString()
        .split(".")
        .map((el) => parseInt(el, 10));

      if (!dec) return newCount;

      if (int === 0) {
        const fr = new Fraction(newCount);
        return `${fr.numerator}/${fr.denominator}`;
      } else {
        const fr = new Fraction(newCount - int);
        return `${int} ${fr.numerator}/${fr.denominator}`;
      }
    }
    return "?";
  };

  export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

export const parseIngredients = (ingredients) => {
	const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon' ,'cups', 'pounds'];
	const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
	const units = [...unitShort, 'kg', 'g']
	
	const newIngredients = ingredients.map(el => {
		// 1. Uniform Units
		let ingredient = el.toLowerCase();
		unitLong.forEach((unit, i) => {
			ingredient = ingredient.replace(unit, unitShort[i]);
		});

		// 2. Remove Parentheses
		ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

		// 3. Parse ingredients into count, unit and ingredient.
		const arrIng = ingredient.split(' ');
		const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

		let objIng;

		if (unitIndex > -1) {
			// There is a unit
			// Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
			// Ex. 4 cups, arrCount is [4]                
			
			const arrCount = arrIng.slice(0, unitIndex); // example 4 1/2 = [4, 1/2] --> eval(4+1/2) = 4.5

			let count;
			if(arrCount.length === 1) {
				// Edge case, ex. 1-1/3 cup, replaces the '-' so with '+' so eval works.
				try {
					count = eval(arrIng[0].replace('-', '+'));
				} catch (error) {
					console.log(error);
				}
			} else {
				// Evaluating so that it turns the array into decimal
				try {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				} catch (error) {
					console.log(error);
				}
			}

			// Final object to return the correct 
			objIng = {
				count: count, 
				unit: arrIng[unitIndex],
				ingredient: arrIng.slice(unitIndex + 1).join(' ')
			}
		} else if (parseInt(arrIng[0], 10)) {
			// There is NO unit, but 1st element is a number
			objIng = {
				count: parseInt(arrIng[0], 10),
				unit: '',
				ingredient: arrIng.slice(1).join(" ")
			}
		} else if (unitIndex === -1) {
			// There is no unit and no number in the first position
			objIng = {
				count: 1,
				unit: '',
				ingredient: ingredient
			}
		}

		return objIng;

		});
		ingredients = newIngredients
		return ingredients;
	}
