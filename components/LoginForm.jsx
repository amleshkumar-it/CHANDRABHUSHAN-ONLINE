'use client';
import { useFormState } from 'react-dom';
import { loginAdmin } from '../app/admin/actions';
export default function LoginForm() {
  const [state, action] = useFormState(loginAdmin, null);
  return (
    <form action={action} className="card">
      <label>Admin Email</label><input name="email" type="email" required />
      <label>Password</label><input name="password" type="password" required />
      <p><button className="btn" type="submit">Login to Admin</button></p>
      {state?.error && <p className="alert" style={{ color: '#b42318' }}>{state.error}</p>}
      <p className="muted">Admin account Supabase Auth me banana hoga (Supabase Dashboard → Authentication → Users). Sirf ADMIN_EMAILS list wale emails login kar sakte hain.</p>
    </form>
  );
}
