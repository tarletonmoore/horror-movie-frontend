import { Link } from "react-router-dom"
export function MovieRecommendations(props) {

console.log(props.recommendations)
  return(
    <div>

      <h1 className="recommendationsheader">Recommendations:</h1>
      <div className="recommendations">
      <div className="row row-cols-2">

      {props.recommendations.map(recommendation => (
        <div key={recommendation.id} className="col-6">
                <div className="card">

                <div className="card-body">

<img src={recommendation.image_url} width="100px" height="150px"/>
<h2>{recommendation.title}</h2>
<p>Description: {recommendation.description}</p>
<p>Subgenre: {recommendation.subgenre}</p>
<Link to={`/movies/${recommendation.id}`}>
          <button className="showbutton">Go to show page</button>
        </Link>
          </div>
          </div>
          </div>

      ))}
      </div>
      </div>
    </div>
  )
}