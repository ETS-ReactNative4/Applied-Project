import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Login = () => {
    return (
<div className="login-form">
			<h1 className="heading">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			
			<br />
			<form className="form">
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						//value={}
						//onChange={}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						//value={}
						//onChange={}
						required
					/>
				</div>
				<input type="submit" className="btn" value="Login" />
			</form>
			<p className="link">
				Don't have an account?  <a href>Sign Up</a>
			</p>
		</div>

    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
  });