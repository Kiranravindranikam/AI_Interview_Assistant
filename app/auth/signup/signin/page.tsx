import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // ✅ Only one import

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email });
    if (error) {
      console.error(error);
    } else {
      router.push('/auth/signup/signin');
    }
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
