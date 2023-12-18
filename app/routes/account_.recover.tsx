import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

type ActionResponse = {
  error?: string;
  resetRequested?: boolean;
};

export async function loader({context}: LoaderFunctionArgs) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }

  return json({});
}

export async function action({request, context}: ActionFunctionArgs) {
  const {storefront} = context;
  const form = await request.formData();
  const email = form.has('email') ? String(form.get('email')) : null;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    if (!email) {
      throw new Error('Please provide an email.');
    }
    await storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error: unknown) {
    const resetRequested = false;
    if (error instanceof Error) {
      return json({error: error.message, resetRequested}, {status: 400});
    }
    return json({error, resetRequested}, {status: 400});
  }
}

export default function Recover() {
  const action = useActionData<ActionResponse>();

  return (
    <div className="con h-screen relative">
      <div className="center w-full max-w-[450px] bg-cream px-7 py-10 rounded-lg account">
        {action?.resetRequested ? (
          <>
            <h6 className="text-center">Request Sent.</h6>
            <p className="mt-2 text-night opacity-30 text-center">
              If that email address is in our system, you will receive an email
              with instructions about how to reset your password in a few
              minutes.
            </p>
            <div className="flex justify-center small [&_a]:underline underline-offset-2">
              <Link to="/account/login">Return to Login</Link>
            </div>
          </>
        ) : (
          <>
            <h6 className="text-center">Forgot yout password?</h6>
            <p className="text-night opacity-30 text-center mt-2 text-xs">
              We’ll send a link to your email to reset your password.
            </p>
            <Form method="POST">
              <fieldset>
                <label htmlFor="email">Email address</label>
                <input
                  aria-label="Email address"
                  autoComplete="email"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  id="email"
                  name="email"
                  placeholder="Enter email address here"
                  required
                  type="email"
                />
              </fieldset>
              {action?.error && (
                <p className="mt-3">
                  <mark>
                    <small>{action.error}</small>
                  </mark>
                </p>
              )}
              <button type="submit">send email</button>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customerrecover
const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover(
    $email: String!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
` as const;
