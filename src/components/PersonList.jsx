import Person from "./Person";

export default function PersonList({ persons = 0 }) {
  const editPerson = name => {
    
  };

  return (
    <>
      <section className="persons">
        {(Object.keys(persons).length !== 0 &&
          Object.entries(persons)
            .sort(([name1], [name2]) => name1.localeCompare(name2))
            .map(([name, orders]) => (
              <Person
                key={name}
                onClick={() => editPerson(name)}
                name={name}
                orders={orders}
              />
            ))) || <p className="empty-list">Empty List</p>}
      </section>
    </>
  );
}
