import { MessageSquare } from "lucide-react";
import logo from "../assets/logo.png";
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-black/65">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-black/10 flex items-center
             justify-center animate-bounce"
            >
              <img src={logo} alt="logo" className="w-8 h-8" />
              {/* <MessageSquare className="w-8 h-8 text-primary " /> */}
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to CharLando!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
