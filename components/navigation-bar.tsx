import { Zap } from "lucide-react";
import { Image } from "lucide-react";
import { Shirt } from "lucide-react";
import { Infinity } from "lucide-react";
import { Settings } from "lucide-react";
import { PanelTop } from "lucide-react";
import { Fan } from "lucide-react";

export const NavigationBar = () => {
    return(
        <div className="flex flex-col justify-between items-center mt-20 h-screen">
            <div className="space-y-8">
                <Fan/>
                <Zap/>
                <Image/>
                <Infinity/>
                <Shirt/>
            </div>
            <div className="mb-10 flex flex-col items-center space-y-8">
                <PanelTop/>
                <Settings/>
            </div>
        </div>
    )
}