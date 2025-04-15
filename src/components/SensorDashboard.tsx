import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Thermometer, Droplets, Sun, Sprout } from "lucide-react";
import mqtt from "mqtt";

interface SensorData {
  temperature: string;
  humidity: string;
  light: string;
  moisture: string;
  classification: string;
}

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: "--",
    humidity: "--",
    light: "--",
    moisture: "--",
    classification: "Unknown",
  });

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Connect to MQTT broker
    const client = mqtt.connect("wss://test.mosquitto.org:8081");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      setConnected(true);

      // Subscribe to topics
      client.subscribe("/ThinkIOT/temp");
      client.subscribe("/ThinkIOT/hum");
      client.subscribe("/ThinkIOT/light");
      client.subscribe("/ThinkIOT/moist");
      client.subscribe("/ThinkIOT/classification");
    });

    client.on("message", (topic, message) => {
      const value = message.toString();

      switch (topic) {
        case "/ThinkIOT/temp":
          setSensorData((prev) => ({ ...prev, temperature: value }));
          break;
        case "/ThinkIOT/hum":
          setSensorData((prev) => ({ ...prev, humidity: value }));
          break;
        case "/ThinkIOT/light":
          setSensorData((prev) => ({ ...prev, light: value }));
          break;
        case "/ThinkIOT/moist":
          setSensorData((prev) => ({ ...prev, moisture: value }));
          break;
        case "/ThinkIOT/classification":
          setSensorData((prev) => ({ ...prev, classification: value }));
          break;
        default:
          break;
      }
    });

    client.on("error", (err) => {
      console.error("MQTT connection error:", err);
      setConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      client.end();
    };
  }, []);

  const getClassificationColor = (classification: string) => {
    switch (classification.toLowerCase()) {
      case "healthy":
        return "bg-green-100 text-green-800 border-green-300";
      case "dry":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "overwatered":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "dark":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getProgressValue = (value: string, max: number) => {
    const numValue = parseFloat(value);
    return isNaN(numValue) ? 0 : (numValue / max) * 100;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Real-time Sensor Data
        </h2>
        <Badge variant={connected ? "default" : "destructive"}>
          {connected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Temperature Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Thermometer className="mr-2 h-5 w-5 text-red-500" />
              Temperature
            </CardTitle>
            <CardDescription>Current reading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {sensorData.temperature} °C
            </div>
            <Progress
              value={getProgressValue(sensorData.temperature, 40)}
              className="h-2 bg-red-100"
            />
          </CardContent>
        </Card>

        {/* Humidity Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Droplets className="mr-2 h-5 w-5 text-blue-500" />
              Humidity
            </CardTitle>
            <CardDescription>Current reading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {sensorData.humidity} %
            </div>
            <Progress
              value={getProgressValue(sensorData.humidity, 100)}
              className="h-2 bg-blue-100"
            />
          </CardContent>
        </Card>

        {/* Light Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sun className="mr-2 h-5 w-5 text-yellow-500" />
              Light
            </CardTitle>
            <CardDescription>Current reading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {sensorData.light} lux
            </div>
            <Progress
              value={getProgressValue(sensorData.light, 1000)}
              className="h-2 bg-yellow-100"
            />
          </CardContent>
        </Card>

        {/* Soil Moisture Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sprout className="mr-2 h-5 w-5 text-green-500" />
              Soil Moisture
            </CardTitle>
            <CardDescription>Current reading</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {sensorData.moisture} %
            </div>
            <Progress
              value={getProgressValue(sensorData.moisture, 500)}
              className="h-2 bg-green-100"
            />
          </CardContent>
        </Card>
      </div>

      {/* Plant Condition Card */}
      <Card className="mt-8 border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Plant Condition Status</CardTitle>
          <CardDescription>Current plant health classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6">
            <div
              className={`text-4xl font-bold px-8 py-4 rounded-lg border-2 ${getClassificationColor(sensorData.classification)}`}
            >
              {sensorData.classification}
            </div>
            <p className="mt-4 text-gray-600 text-center max-w-md">
              {sensorData.classification === "Healthy" &&
                "Your plant is in optimal condition. Keep up the good work!"}
              {sensorData.classification === "Dry" &&
                "Your plant needs water. Consider increasing watering frequency."}
              {sensorData.classification === "Overwatered" &&
                "Your plant has excess water. Reduce watering and ensure proper drainage."}
              {sensorData.classification === "Dark" &&
                "Your plant needs more light. Consider relocating to a brighter spot."}
              {!["Healthy", "Dry", "Overwatered", "Dark"].includes(
                sensorData.classification,
              ) && "Waiting for plant condition data..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensorDashboard;
