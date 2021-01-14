import React from 'react';
import {Link} from 'react-router-dom';
const Homepage = () => {
    return (
        <div>
           <div>
               <div>
                   <h1>Entertainment</h1>
                   <Link to = '/signup'/>
               </div>
               <div>
                   <div>
                       <h1>Unlimited films, TV programmes and more.</h1>
                       <h4>Watch anywhere. Cancel at any time.</h4>
                   </div>
                   <div>
                       <form>
                           <input type = 'text' placeholder = 'Email Address' autoComplete = 'off'/>
                           <button>Try Now</button>
                       </form>
                       <h4>Ready to Watch ? Enter your Email to create or restart your membership</h4>
                   </div>
               </div>
           </div>
        </div>
    )
}
export default Homepage;