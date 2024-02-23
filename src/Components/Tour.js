// /////////////////////////////////////
// This deletes all cards one by one and finelly refreshes all cards again


import React, { useEffect, useState } from 'react';
const url = 'https://course-api.com/react-tours-project';

const Tours = () => {
  // for maping from API
  const [tours, setTours] = useState([]);
  // for Try and Catch Error
  const [error, setError] = useState(null);
  // for Deleting button
  const [allDeleted, setAllDeleted] = useState(false);
  // for Toggleing button to show and Hide the text
  const [showInfo, setShowInfo] = useState([]); // State to track info visibility for each tour


  // for Fetching and  Try and Catch Error
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch tours');
          }
          const data = await response.json();
          // console.log(data);
          setTours(data);

          // Initialize showInfo array with false values for each tour
          setShowInfo(Array(data.length).fill(false));
          } 
      catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  
  }, []);


  if (error) {
    return <div>Error: {error}</div>;
  }



// for Deleting button
  const handleDeleteTour = (tourId) => {
    setTours(tours.filter(tour => tour.id !== tourId));
    if (tours.length === 1) {
      setAllDeleted(true);
    }
  }


//// for Deleting button To Refresh the cards again after Deleting all cards
  const handleRefresh = () => {
    window.location.reload();
  }


// for Toggleing button to show and Hide the text
  const handleToggleInfo = (index) => {
    // Toggle the visibility for the tour at the given index
    setShowInfo(prev => {
      const newShowInfo = [...prev];
      newShowInfo[index] = !newShowInfo[index];
      return newShowInfo;
    });
  };
 

  return (
    <section>
      <h1>Our Tours</h1>
      
      <main className='tour-card'>
{/* for maping from API */}
        {tours.map((item, index) => {
          const {id, name, price, image, info} = item;
          return (
            <article key={id} className='tour-package'>
              <div className='tour-container'>
                <img className='tour-img' src={image} alt={name} />
                <p className='tour-price'>${price}</p>
              </div>
              <div className='three-sum'>
                <h3>{name}</h3>
{/* // for Toggleing button to show and Hide the text */}
                <p>{showInfo[index] ? info : `${info.substring(0, 130)}...`}
                  <button className="show-and-hide-btn" onClick={() => handleToggleInfo(index)}>
                    {showInfo[index] ? "Show less" : "Show more"}
                  </button>
                </p>
{/* // for Deleting button */}
                <button className="delete-btn" onClick={() => handleDeleteTour(id)}>I'm not interested</button>
              </div>
            </article>
          );
        })}
{/* //// for Deleting button To Refresh the cards again after Deleting all cards */}
        {allDeleted && <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>}
        {tours.length === 0 && !allDeleted && <p>No tours left</p>}
      </main>
    </section>
  );
}

export default Tours;





















// /////////////////////////////////////
// This deletes only the card

// import React, { useEffect, useState } from 'react';
// const url = 'https://course-api.com/react-tours-project';

// const Tours = () => {
//   const [tours, setTours] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch tours');
//         }
//         const data = await response.json();
//         console.log(data);
//         setTours(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
  
//   }, []);


//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   const handleDeleteTour = (tourId) => {
//     setTours(tours.filter(tour => tour.id !== tourId));
//   }


//   return (
//     <section className='tours-card'>
//       <h1>Our Tours</h1>
      
//       <main className='tour-card'>
//         {tours.map((item) => {
//           const {id, name, price, image, info} = item;
//           return (
//             <article key={id} className='tour-package'>
//               <div>
//                 <img className='tour-img' src={image} alt={name} />
//                 <p>${price}</p>
//               </div>
//               <h3>{name}</h3>
//               <p>{info}</p>
//               <button className="tour-btn" onClick={() => handleDeleteTour(id)}>Delete</button>
//             </article>
//           );
//         })}
//       </main>
//     </section>
//   );
// }

// export default Tours;


