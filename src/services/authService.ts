import { supabase } from '../lib/supabase';

class AuthService {
  private static instance: AuthService;
  private isAuthenticating = false;
  private authPromise: Promise<void> | null = null;
  private sessionChecked = false;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async signup() {
    const { error } = await supabase.auth.signUp({
      email: 'abouelfetouhm@gmail.com',
      password: 'a5013463'
    });
    
    if (error) throw error;
  }

  private async login() {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'abouelfetouhm@gmail.com',
      password: 'a5013463'
    });
    
    if (error) throw error;
  }

  public async ensureAuthenticated(): Promise<void> {
    if (this.sessionChecked) {
      return Promise.resolve();
    }

    if (this.isAuthenticating) {
      return this.authPromise!;
    }

    this.isAuthenticating = true;
    this.authPromise = (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          try {
            await this.login();
          } catch (loginError) {
            console.log('Login failed, attempting signup...');
            await this.signup();
            await new Promise(resolve => setTimeout(resolve, 1000));
            await this.login();
          }
        }
        
        this.sessionChecked = true;
      } catch (error) {
        console.error('Authentication error:', error);
        throw error;
      } finally {
        this.isAuthenticating = false;
      }
    })();

    return this.authPromise;
  }

  public clearSessionCheck() {
    this.sessionChecked = false;
  }
}

export const authService = AuthService.getInstance();