// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract SiameseCat {
    enum Type {
        SealPoint,
        ChocolatePoint,
        BluePoint,
        LilacPoint
    }

    struct Meezer {
        string _name;
        string _color;
        string _location;
        string _personality;
        Type _type;
    }

    Meezer[] meezers;

    uint256 public meezerCount;

    function addMeezer(
        string memory _name,
        string memory _color,
        string memory _location,
        string memory _personality,
        Type _type
    ) public {
        meezers.push(Meezer(_name, _color, _location, _personality, _type));
        meezerCount++;
    }

    function getMeezers() public view returns (Meezer[] memory) {
        return meezers;
    }
}
