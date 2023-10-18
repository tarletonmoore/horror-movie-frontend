
export function ReviewsUpdate(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onUpdateReview(props.review.id, params, () => event.target.reset());
  };



  return (
    <div>
      <form onSubmit={handleSubmit} className="updateform">
        <div>
          Review: <input defaultValue={props.review.review} name="review" type="text" />
        </div>
        <br></br>
        <button type="submit">Update Review</button>
      </form>

    </div>
  )
}