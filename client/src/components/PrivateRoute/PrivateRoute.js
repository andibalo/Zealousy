import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

//ADDING LOCALSTORAGE TOKEN AS CHECK 
//CASE: going to protected route without logging in 
//PROBLEM: INFINITE LOADING SCREEN
//without it program will pass the cehck and render the component however since we are not authed
//the program will not be able to make request and just stuck in loading backdrop (NO DATA)
//IT PASSES THE CHECK BECAUSE IT IS && AND LOADING IS ALWAYS TRUE BECUASE WE DONT MAKE ANY REQUEST
const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                //WE MUST ADD !LOADING TO CONDITION OTHERWISE APPLICATION BREAKS
                //WHY? I DONT FUCKING KNOW
                !loading && !isAuthenticated || !localStorage.getItem('token') ? (
                    <Redirect to="/login" />
                ) :
                    (
                        <Component {...props} />
                    )
            }
        />
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
