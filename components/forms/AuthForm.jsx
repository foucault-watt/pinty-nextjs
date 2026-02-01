"use client";

import { signInWithGoogle } from '@/utils/actions';

export const AuthForm = () => {
  return (
    <div>
      <button className="btn btn-outline" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};
