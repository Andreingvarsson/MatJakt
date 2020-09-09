let persons = [
    {name: "André", role: "student", id: 1},
    {name: "Andreas", role: "student", id: 2},
    {name: "Thomas", role: "teacher", id: 3},
    {name: "Andreas", role: "student", id: 2},
    {name: "Thomas", role: "teacher", id: 3},
    {name: "Thomas", role: "teacher", id: 3},
    {name: "André", role: "student", id: 1},
    {name: "André", role: "student", id: 1},
    {name: "Thomas", role: "teacher", id: 3}
  ];
  let personsWithNoDuplicates = [];
  let hash = {};
  for(let person of persons){
    if(hash[person.id]){ continue; }
    // add the person to the no duplicates array
    personsWithNoDuplicates.push(person);
    // add the person with the person id as a key to the hash
    hash[person.id] = person;
  }
  console.log("persons no duplicates",personsWithNoDuplicates);
  console.log("the hash we used", hash);