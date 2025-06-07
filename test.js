
//given these functions
console.time()
const mockAPIDelay = (data) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 400);
    });
const getPetNames = () =>
    mockAPIDelay([
        { type: 'dog', name: 'derp' },
        { type: 'cat', name: 'waffles' },
    ]);
const getPetFoods = () =>
    mockAPIDelay([
        { type: 'cat', food: 'cat food' },
        { type: 'dog', food: 'dog food' },
    ]);
// write a function that fetches both "apis" and returns the following response:
// [{name: 'derp', food: 'dog food'}, {name: 'waffles', food: 'cat food'}]
const getData = async () => {
    const [petsV, foodsV] = await Promise.all(
        [getPetNames(), getPetFoods()]
    )

    const listPets = petsV.map((item) => {
        let foodItem = foodsV.find((i) => i.type === item.type)
        return {
            'name': item.name,
            'food': foodItem?.food
        }
    })
    console.log('list Pet', listPets)
    console.timeEnd()
    return listPets;
}

getData();