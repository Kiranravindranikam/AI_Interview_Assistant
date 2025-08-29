import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    // Step 1: Sign up user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email });

    if (error) {
      console.error("Signup error:", error.message);
      return;
    }

    // Step 2: Insert email into your custom table (replace 'users_table' with your table name)
    const { error: insertError } = await supabase
      .from('users_table')   // 👈 change this to your actual table name
      .insert([{ email }]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
    } else {
      console.log("Email inserted successfully!");
      router.push('/auth/signup/signin'); // redirect after success
    }
  };

  return (
    <div>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter email" 
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
