import React from 'react';
import {Link} from 'react-router-dom';
const faq = [{
    key:1,
    question:'What is Entertainment ? ',
    answer:`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque vel velit nec mi suscipit accumsan a id dolor. 
        Nam at tellus egestas, gravida justo a, egestas nulla. Etiam eleifend eleifend vulputate. 
        Donec vestibulum pulvinar rhoncus. Mauris at ante tortor. Ut orci lorem, accumsan. `
},
{
    key:2,
    question:'How much does Entertainment cost ? ',
    answer:`In et maximus mauris. 
    Aenean finibus in leo quis accumsan. 
    Cras vulputate est sit amet mauris ullamcorper sagittis. 
    Aliquam pellentesque velit eget erat commodo efficitur. `
},
{
    key:3,
    question:'Where can i watch ? ',
    answer:`In euismod sollicitudin risus,
    eu blandit mauris dapibus id.
    Suspendisse dignissim facilisis lacus,
    et tempor leo pharetra non. Suspendisse urna risus,`
},
{
    key:4,
    question:'How can i cancel ? ',
    answer:`Suspendisse ac ligula sagittis, blandit mi ac, gravida justo.
    Vestibulum non ex eget diam semper facilisis vel id erat.
    Proin eget diam ultricies, `
},
{
    key:5,
    question:'What can i watch on  Entertainment ? ',
    answer:`In euismod sollicitudin risus,
    eu blandit mauris dapibus id. Suspendisse dignissim facilisis lacus,
    et tempor leo pharetra non. Suspendisse urna risus, pulvinar ac tristique a,
    convallis viverra arcu. `
},
]
const Homepage = () => {
    const Card = ({question,answer}) => {
        const [open,setOpen] = React.useState(false);
        if(open)
            return (
                <div className= 'card'>
                    <div className = 'card_box_1'>
                        <h3>{question} </h3>
                        <h3><span onClick = {() => setOpen((state) => false) }><i className = 'fa fa-times'></i></span></h3>
                    </div>
                    <div className = 'card_box_2'>
                        <p>
                            {answer}
                        </p>
                    </div>
                </div>
            )
        else
        {
            return (
                <div className = 'card'>
                    <div className = 'card_box_1'>
                        <h3>{question} </h3>
                        <h3><span onClick = {() => setOpen((state) => true)}>+</span></h3>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className = 'homepage'>
           <div className = 'homepage_box_1'>
               <div className = 'header'>
                   <Link className = 'logo' to = '/'>Entertainment</Link>
                   <Link className = 'link' to = '/signup'>
                       Sign In
                   </Link>
               </div>
               <div className = 'main'>
                   <div className = 'main_box_1'>
                       <h1>Unlimited films,TV <br />programmes and more.</h1>
                       <h4>Watch anywhere. Cancel at any time.</h4>
                   </div>
                   <div className = 'main_box_2'>
                       <form>
                           <input type = 'text' placeholder = 'Email Address' autoComplete = 'off'/>
                           <button>Try Now</button>
                       </form>
                       <h4>Ready to Watch ? Enter your Email to create or restart your membership</h4>
                   </div>
               </div>
           </div>
           <div className = 'homepage_box_2'>
                <div className = 'homepage_box_2_box_1'>
                    <h1>Enjoy on your TV</h1>
                    <p>
                        Watch on smart TVs, PlayStation, Xbox, <br />Chromecast, and more.
                    </p>
                </div>
                <div className = 'homepage_box_2_box_2'>
                    <div>

                    </div>
                </div>
           </div>
           <div className = 'homepage_box_3'>
                <div className = 'homepage_box_2_box_2 homepage_box_3_box_2'>
                    <div>

                    </div>
                </div>
                <div className = 'homepage_box_2_box_1 homepage_box_3_box_1'>
                    <div>
                        <h1>Download your <br /> programmes to watch <br /> on the go.</h1>
                        <p>
                            Save your data and watch all your favorites online.
                        </p>
                    </div>
                </div>
           </div>
           <div className = 'homepage_box_2'>
                <div className = 'homepage_box_2_box_1'>
                    <h1>Watch everywhere.</h1>
                    <p>
                        Stream unlimited movies and TV shows on <br /> your phone, tablet, laptop, and TV without <br />paying more.
                    </p>
                </div>
                <div className = 'homepage_box_2_box_1 homepage_box_5_box_2'>
                    <div>

                    </div>
                </div>
           </div>
           <div className = 'homepage_box_4'>
               <h1>Frequently Asked Questions</h1>
               <div className = 'homepage_box_4_box'>
               {
                   faq.map((faq) => {
                       return <Card  key = {faq.key} question = {faq.question} answer = {faq.answer}/>
                   })
               }
               </div>
               <div className = 'main_box_2'>
                    <form>
                        <input type = 'text' placeholder = 'Email Address' autoComplete = 'off'/>
                        <button>Try Now</button>
                    </form>
                    <h4>Ready to Watch ? Enter your Email to create or restart your membership</h4>
                </div>
           </div>
           <div className = 'footer'>
                <h4>2020. Rajarshi Saha</h4>
            </div>
        </div>
       
        
    )
}
export default Homepage;