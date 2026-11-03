'use client';
import { useFormStatus } from 'react-dom';

// Submit button for admin server-action forms. While the action runs the
// button shows "Saving…" and is disabled, so a slow save is visible and
// a second tap cannot create a duplicate service.
export default function SaveButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn" type="submit" disabled={pending}>
      {pending ? 'Saving…' : label}
    </button>
  );
}
