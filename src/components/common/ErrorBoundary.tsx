import React from 'react';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070A] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-6">
            <Logo size="xl" align="center" />
          </div>
          <p className="text-white/60 text-sm max-w-md mb-8 font-light leading-relaxed">
            The workspace encountered a temporary rendering state. Click below to refresh and return to the main newsroom.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-sm transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Agency Newsroom</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

