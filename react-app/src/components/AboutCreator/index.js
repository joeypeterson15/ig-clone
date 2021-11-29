import { Link } from "react-router-dom";
import { Route } from "react-router";
import './AboutCreator.css'


function AboutCreator () {
    return (
        <div className="about-outer-container">

            <div className="about-card">

                    <div id="about-photo">
                        <img alt=""></img>
                    </div>

                    <div className="about-info-card">
                        <h3>Author: Joey Peterson</h3>
                        <div>
                       <Link to='https://github.com/joeypeterson15'>Github</Link>


                        </div>
                        <div>
                        <Link>Linkedin</Link>

                        </div>
                    </div>

            </div>

        </div>
    )
}
// 'https://github.com/joeypeterson15'
export default AboutCreator;
