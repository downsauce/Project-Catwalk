import React, { useState, useEffect, useContext } from 'react';
import FilterRatings from './ratings/FilterRatings/FilterRatings.jsx';
import ReviewList from './ratings/ReviewList/ReviewList.jsx';
import CreateReview from './ratings/CreateReview/CreateReview.jsx';
import SortReviews from './ratings/SortReviews/SortReviews.jsx';
import ModalPhoto from './ratings/ModalPhoto/ModalPhoto.jsx';
import MainContext from './shared/context/MainContext.js';
import axios from 'axios';
import token from '../../server/config.js';

function Ratings(props) {

  const [reviews, setReviews] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [stars, setStars] = useState([]);
  const [count, setCount] = useState();
  const [clickedPhoto, setClickedPhoto] = useState('');
  const [modal, setModal] = useState(false);
  const { allReviews, metaReviews, setAllReviews, selectedProduct, setMetaReviews, productFeature } = useContext(MainContext);


  //FILTER METHODS
  const addFilter = (star) => {
    let selected = allReviews.filter((review) => review.rating === star);
    let joinSelected = selected.concat(filtered);
    let addStar = stars.concat([star]);
    setFiltered(joinSelected);
    setStars(addStar);
  };
  const removeFilter = (star) => {
    let unselected = filtered.filter((review) => review.rating !== star);
    let index = stars.indexOf(star)
    let newStars = stars;
    newStars.splice(index, 1);
    setFiltered(unselected);
    setStars(newStars);
  };
  const handleReviewFilter = (star) => {
    if (stars.indexOf(star) === -1) {
      addFilter(star);
    } else {
      removeFilter(star);
    }
  };
  const clearFilter = () => {
    setFiltered([]);
    setStars([]);
  };

  //REVIEW LIST METHODS
  const moreReviews = () => {
    let more = allReviews.slice(0, reviews.length + 2);
    setReviews(more);
  };
  const lessReviews = () => {
    let less = reviews.slice(0, reviews.length - 2);
    setReviews(less);
  };

  //SORT METHOD
  const handleSort = (selection) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?count=100&sort=${selection}&product_id=${selectedProduct}`, {
      headers: {'Authorization': token}
    })
    .then((data) => {
      setAllReviews(data.data.results);
      // setCount(allReviews.length);
      // setFiltered(allReviews.slice(0, filtered.length));
      // setReviews(allReviews.slice(0, reviews.length));
    })
    .catch((err) => console.log(err));
  };

  //MODAL METHODS
  const handlePhotoClick = (url) => {
    setClickedPhoto(url);
    setModal(true);
  };

  //PAGE RENDERS
  useEffect(() => {
    if (allReviews) {
      if (reviews === null) {
        setReviews(allReviews.slice(0, 2));
        setCount(allReviews.length);
      } else {
        setCount(allReviews.length);
        setFiltered(allReviews.slice(0, filtered.length));
        setReviews(allReviews.slice(0, reviews.length));
      }
    }
  }, [allReviews]);

  //PRODUCT CHANGE RENDER
  useEffect(() => {
    if (selectedProduct && metaReviews && Number(metaReviews.product_id) !== selectedProduct) {
      axios.get(`/reviews/${selectedProduct}`)
      .then((data) => {
        setAllReviews(data.data.results);
        return axios.get(`/products/${selectedProduct}/review`)
      })
      .then((data) => {
        setMetaReviews(data.data);
        // setCount(allReviews.length);
        // setFiltered([]);
        // setReviews(allReviews.slice(0, 2));
      })
      .catch(err => console.log(err.message));
    }
  }, [selectedProduct]);

  // //REVIEWS ARE SORTED
  // useEffect(() => {
  //   if (filtered.length > 0) {
  //     setFiltered(allReviews.slice(0, filtered.length));
  //   } else {
  //     setReviews(allReviews.slice(0, reviews.length));
  //   }
  // }, [allReviews]);


  if (allReviews && metaReviews && reviews) {
    return (
      <div>
        <h1 id="ratings">Ratings &amp; Reviews</h1>
        <SortReviews sort={handleSort} numberOfReviews={count} />
        <FilterRatings
          meta={metaReviews}
          handleClick={handleReviewFilter}
          clearFilter={clearFilter}
        />
        <ModalPhoto photo={clickedPhoto} showModal={modal} hideModal={setModal}/>
        <ReviewList
          reviews={filtered.length === 0 ? reviews : filtered}
          meta={metaReviews}
          moreReviews={moreReviews}
          lessReviews={lessReviews}
          filtered={filtered}
          count={count}
          photoClick={handlePhotoClick}
        />
        <CreateReview currentProductId={selectedProduct} currentProductName={productFeature.name} meta={metaReviews} updateReviews={setAllReviews} reviews={allReviews}/>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Ratings;