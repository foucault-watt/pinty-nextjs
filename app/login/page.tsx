import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered"
              />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button formAction={login} className="btn btn-primary">
                Log in
              </button>
              <button formAction={signup} className="btn btn-outline">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
