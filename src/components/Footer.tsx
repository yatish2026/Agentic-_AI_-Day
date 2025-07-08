export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-glow">Sahayak</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              Empowering teachers and students with AI-driven educational tools for multi-grade classrooms.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Content Generation</li>
              <li>Progress Tracking</li>
              <li>Visual Aids</li>
              <li>Speaking Coach</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Teacher Guide</li>
              <li>Student Portal</li>
              <li>Help Center</li>
              <li>Tutorials</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>Support</li>
              <li>Community</li>
              <li>Feedback</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/60">
            © 2024 Sahayak AI Teaching Assistant. Powered by Google Cloud AI.
          </p>
        </div>
      </div>
    </footer>
  );
};