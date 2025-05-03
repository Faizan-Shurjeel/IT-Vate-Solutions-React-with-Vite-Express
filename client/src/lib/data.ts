import { ExpertiseArea, Testimonial } from "./types";

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  content: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Embedded Systems Development",
    description: "Robust hardware and firmware for next-generation products.",
    icon: "cpu",
    borderColor: "border-primary",
  },
  {
    title: "IoT Development",
    description: "Smart, connected solutions for a data-driven world.",
    icon: "wifi",
    borderColor: "border-secondary",
  },
  {
    title: "Consultancy",
    description: "Expert advice to accelerate your innovation journey.",
    icon: "briefcase",
    borderColor: "border-accent",
  },
  {
    title: "Training & Certification",
    description: "Industry-leading courses to empower future engineers.",
    icon: "graduation-cap",
    borderColor: "border-primary-dark",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "IT-vate’s PCB design expertise took our product to the next level—delivered ahead of schedule and beyond expectations.",
    name: "Ammar Raza",
    title: "Founder, TechStart",
  },
  {
    quote:
      "Their IoT platform transformed our operations—seamless integration and outstanding support.",
    name: "Dr. Sara Mehmood",
    title: "Operations Head, SmartAgro",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Why PCB Design Is the Heart of Your Product",
    description:
      "Learn why professional PCB design is crucial for product performance, reliability, and manufacturing success.",
    date: "June 15, 2023",
    image:
      "https://images.unsplash.com/photo-1662528600042-f28b7a9e4c75?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: `
A Printed Circuit Board (PCB) is more than just a platform for mounting components—it's the backbone of your electronic product. A well-designed PCB ensures signal integrity, minimizes noise, and enables reliable operation even in challenging environments.

Why does PCB design matter?
- Performance: The layout and routing directly affect signal speed, power delivery, and electromagnetic compatibility.
- Reliability: Good design prevents overheating, reduces the risk of failure, and extends product lifespan.
- Manufacturability: Professional PCB design considers assembly processes, reducing errors and costs during production.

Tips for Success:
- Collaborate early with your PCB designer.
- Prioritize clear documentation and design reviews.
- Test prototypes thoroughly before mass production.

A great product starts with a great PCB—invest in quality design from the outset!
    `,
  },
  {
    id: 2,
    title: "Choosing the Right Microcontroller for Your Application",
    description:
      "A comprehensive guide to selecting the optimal microcontroller based on your project requirements.",
    date: "May 22, 2023",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
Selecting a microcontroller (MCU) is a pivotal decision in embedded system design. The right choice balances performance, cost, and scalability.

Key Factors to Consider:
- Processing Power: Match the MCU's speed and architecture to your application's complexity.
- Memory: Ensure sufficient RAM and flash for your code and data.
- Peripherals: List required interfaces (UART, SPI, I2C, ADC, etc.).
- Power Consumption: For battery-powered devices, prioritize low-power MCUs.
- Ecosystem: Consider toolchain support, community, and documentation.

Popular MCU Families:
- ARM Cortex-M (STM32, NXP, TI)
- AVR (Microchip/Atmel)
- PIC (Microchip)
- ESP32 (Espressif, for IoT/WiFi/BLE)

Pro Tip: Prototype with evaluation boards before finalizing your selection.
    `,
  },
  {
    id: 3,
    title: "IoT vs. Embedded: Understanding the Difference",
    description:
      "Clarifying the distinctions between IoT and traditional embedded systems for better project planning.",
    date: "April 10, 2023",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
The terms "IoT" and "embedded systems" are often used interchangeably, but they have distinct meanings.

Embedded Systems:  
- Standalone devices with dedicated functions (e.g., washing machine controllers, automotive ECUs).
- Typically not connected to the internet.

IoT (Internet of Things):  
- Embedded systems with connectivity (WiFi, BLE, LoRa, etc.).
- Exchange data with other devices or the cloud.
- Enable remote monitoring, control, and analytics.

Why it matters:  
- IoT projects require additional considerations: security, cloud integration, firmware updates, and data management.
- Not all embedded systems need to be IoT, but all IoT devices are embedded systems.

Plan accordingly: Define your connectivity and data requirements early in the design process.
    `,
  },
  {
    id: 4,
    title: "The Future of FPGA Development",
    description:
      "Exploring how FPGAs are evolving and their growing importance in modern embedded systems.",
    date: "March 5, 2023",
    image:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
Field-Programmable Gate Arrays (FPGAs) are revolutionizing embedded design by offering flexibility, speed, and parallel processing.

Trends in FPGA Development:
- Higher Integration: Modern FPGAs include CPUs, DSPs, and high-speed interfaces.
- Lower Power: Advances in process technology make FPGAs viable for portable applications.
- Open Source Tools: The rise of open-source toolchains is lowering the barrier to entry.
- AI & ML Acceleration: FPGAs are increasingly used for edge AI and real-time data processing.

Why consider FPGAs?
- Custom hardware acceleration for demanding tasks.
- Rapid prototyping and reconfigurability.
- Long-term product flexibility.

Getting started:  
Explore platforms like Xilinx Zynq, Intel/Altera Cyclone, and Lattice iCE40 for your next project.
    `,
  },
  {
    id: 5,
    title: "Implementing Secure Communication in IoT Devices",
    description:
      "Best practices for ensuring your IoT devices communicate securely with cloud services.",
    date: "February 15, 2023",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
Security is a top concern for IoT deployments. Unsecured devices can be exploited, leading to data breaches or service disruptions.

Best Practices:
- Use Encryption: Always encrypt data in transit (TLS/SSL, HTTPS, MQTT over TLS).
- Authenticate Devices: Implement strong authentication (certificates, tokens).
- Regular Updates: Support secure firmware updates to patch vulnerabilities.
- Minimal Exposure: Only open necessary ports and services.
- Monitor & Log: Track device activity for anomalies.

Remember:  
Security is not a one-time task—it's an ongoing process. Build it into your development lifecycle from day one.
    `,
  },
  {
    id: 6,
    title: "Power Management Techniques for Battery-Operated Devices",
    description:
      "Strategies to extend battery life and optimize power consumption in portable devices.",
    date: "January 20, 2023",
    image:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
Battery life is critical for portable and remote devices. Efficient power management can make or break your product's success.

Key Techniques:
- Sleep Modes: Use deep sleep and low-power modes whenever possible.
- Efficient Code: Optimize firmware to minimize CPU wake-ups and processing time.
- Component Selection: Choose low-power MCUs, sensors, and radios.
- Dynamic Power Scaling: Adjust voltage and frequency based on workload.
- Smart Sensing: Sample sensors less frequently or only when needed.

Testing:  
Profile your device's power consumption under real-world conditions to identify further savings.

A little attention to power management goes a long way in delighting your users!
    `,
  },
];
