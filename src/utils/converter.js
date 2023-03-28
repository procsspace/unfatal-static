class Convter {
    constructor() {}

    /**
     * 
     * @param {int} uptime
     * @returns 
     */

    uptime(uptime) {
        if (uptime === undefined || uptime === null) throw new Error("No uptime provided");
        if (typeof uptime!== "number") throw new Error("Uptime must be a number");

        const seconds = Math.floor(uptime % 60);
        const minutes = Math.floor(uptime / 60) % 60;
        const hours = Math.floor(uptime / 3600) % 24;
        const days = Math.floor(uptime / 86400);


        // If something is 0, don't show it
        let time;

        if (days > 0) {
            time = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else if (hours > 0) {
            time = `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            time = `${minutes}m ${seconds}s`;
        } else {
            time = `${seconds}s`;
        }

        return time

    }

    /**
     * 
     * @param {int} cpu 
     * @returns 
     */
    cpu(cpu) {
        if (cpu === undefined || cpu === null) throw new Error("No cpu provided");
        if (typeof cpu!== "number") throw new Error("Cpu must be a number");

        return cpu.toFixed(2);

    }

    /**
     * 
     * @param {int} memory 
     * @returns 
     */

    memory(memory) {
        if (memory === undefined || memory === null) throw new Error("No memory provided");
        if (typeof memory!== "number") throw new Error("Memory must be a number");
        
        const bytes = memory;
        const kb = bytes / 1024;
        const mb = kb / 1024;
        const gb = mb / 1024;
        const tb = gb / 1024;
        const pb = tb / 1024;

        return `${bytes.toFixed(2)} B`;
    }

    
    /**
     * 
     * @param {number} number
     * @returns 
     */
    percentage(number) {
        if (number === undefined || number === null) throw new Error("No number provided");
        if (typeof number !== "number") throw new Error("Number must be a number");

        return (number * 100).toFixed(2) + "%";
    }


}

module.exports = Convter;