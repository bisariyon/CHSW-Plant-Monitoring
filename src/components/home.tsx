import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "./Navigation";
import SensorDashboard from "./SensorDashboard";
import AnalyticsDashboard from "./AnalyticsDashboard";
import AdvancedAnalysis from "./AdvancedAnalysis";

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4 bg-card">
        <h1 className="text-2xl font-bold text-center text-foreground">
          Smart Agriculture Monitoring System
        </h1>
      </header>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto p-4 md:p-6">
        <Tabs
          defaultValue="home"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="home">Home Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Dashboard</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Real-time Sensor Data</h2>
              <p className="text-muted-foreground">
                View the current readings from all sensors and plant condition
                status.
              </p>
              <SensorDashboard />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
              <p className="text-muted-foreground">
                Explore historical data trends and patterns with PowerBI
                visualizations.
              </p>
              <AnalyticsDashboard />
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="mt-4">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Advanced Analysis</h2>
              <p className="text-muted-foreground">
                View predictive analytics and insights powered by Apache
                PySpark.
              </p>
              <AdvancedAnalysis />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground mt-auto">
        <p>© {new Date().getFullYear()} Smart Agriculture Monitoring System</p>
      </footer>
    </div>
  );
};

export default Home;
