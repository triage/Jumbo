pragma solidity ^0.4.18;
import { Schedule } from "./Schedule.sol";

library ScheduleFactory {
    function create(address sender, address class, string instructor, uint dateStart, uint dateEnd, uint nSpots, uint nSpotsReseller, uint priceIndividual, uint priceReseller) public returns (address) {
        require(class != 0x0);
        require(dateStart > 0);
        require(dateEnd > 0);
        require(nSpots > nSpotsReseller);
        require(priceIndividual > 0);
        require(priceReseller > 0);
        
        Schedule schedule = new Schedule(class, instructor, dateStart, dateEnd, nSpots, nSpotsReseller, priceIndividual, priceReseller);
        schedule.transferOwnership(sender);
        assert(schedule.owner() == sender);
        return schedule;
    }
}
