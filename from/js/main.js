import {loadHeaderFooter} from "./general.mjs";

import { createClient } from "@supabase/supabase-js";

loadHeaderFooter();

const supabaseUrl = "https://xpwvomfulwjlrcdcojyj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd3ZvbWZ1bHdqbHJjZGNvanlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MTE5MDcsImV4cCI6MjA1MDE4NzkwN30.x1PGuE8ell96Us2LbW56R6O8f7Kkkquulsljvj5RLwg";
const supabase = createClient(supabaseUrl, supabaseKey);

async function supabaseRegisterUser(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      console.log("User registered:", data);
      alert("Registration successful! Please check your email to verify your account.");
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(`Registration failed: ${error.message}`);
    }
  }
  
  async function supabaseLoginUser(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log("User logged in:", data);
      alert("Login successful!");
      window.location.href = "/dashboard.html"; 
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert(`Login failed: ${error.message}`);
    }
  }
  
  document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    if (email && password) {
      supabaseRegisterUser(email, password);
    } else {
      alert("Please fill in all required fields.");
    }
  });
  
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (email && password) {
      supabaseLoginUser(email, password);
    } else {
      alert("Please fill in all required fields.");
    }
  });
  
  export { supabaseRegisterUser, supabaseLoginUser };