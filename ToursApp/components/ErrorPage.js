import React from "react";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h4>404!</h4>
            <p>
                Not Found
            </p>
            <Link to = '/'>Go To Homepage</Link>
        </div>
    )
}
export default ErrorPage;