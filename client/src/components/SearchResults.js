// import React from "react";
// const SearchResults = props => {
//   // loopObjects = () =>{
//   //   Object.keys(this.synopsis).forEach((key) => {
//   //     let sKey = this.synopsis[key];
//   //     let iKey = this.image[key];
//   //     console.log(sKey, iKey);
//   //   }) 
//   // }
//   return (
//     <div className="search-results">
//       {props.books.map((book, i) => (

//         <div>
//           <ul>
//             <img alt={book.volumeInfo.imageLinks.smallThumbnail} src={book.volumeInfo.imageLinks.smallThumbnail}></img>
//             <li>
//               Title: {book.volumeInfo.title}
//             </li>
//             <li>
//               Author: {book.volumeInfo.authors}
//             </li>
//             <li>
//               Synopsis: {book.volumeInfo.description}
//             </li>
//             <li>
//               <a href={book.volumeInfo.infoLink}>Info Link</a>
//             </li>
//           </ul>
//           <button name="savebtn" onClick={props.handleSaveBook}>
//             Add
//           </button>
//           <button name="viewbtn">
//             <span href={props.link}>View</span>
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default SearchResults;