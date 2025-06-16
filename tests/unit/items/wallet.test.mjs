import { expect } from "chai";
import { Wallet } from "../../../items/Wallet.mjs";


describe("Wallet", () => {
  let logs;
  const logger = (msg) => logs.push(msg);

  beforeEach(() => {
    logs = [];
  });

  it("initializes with given balance", () => {
    const w = new Wallet(100);
    expect(w.balance).to.equal(100);
  });

  it("defaults balance to 0 if no initial value provided", () => {
    const w = new Wallet();
    expect(w.balance).to.equal(0);
  });

  it("adds positive amount correctly", () => {
    const w = new Wallet(50, logger);
    w.add(25);
    expect(w.balance).to.equal(75);
    expect(logs).to.include("Added 25 gold. New balance: 75g");
  });

  it("throws error when adding negative amount", () => {
    const w = new Wallet(10);
    expect(() => w.add(-5)).to.throw("Cannot add negative gold");
  });

  it("spends amount correctly when funds are sufficient", () => {
    const w = new Wallet(100, logger);
    const result = w.spend(40);
    expect(result).to.be.true;
    expect(w.balance).to.equal(60);
    expect(logs).to.include("Spent 40 gold. Balance: 60");
  });

  it("does not spend when funds are insufficient", () => {
    const w = new Wallet(30, logger);
    const result = w.spend(50);
    expect(result).to.be.false;
    expect(w.balance).to.equal(30);
    expect(logs).to.include("Not enough gold!");
  });

  it("throws error when spending negative amount", () => {
    const w = new Wallet(10);
    expect(() => w.spend(-10)).to.throw("Cannot spend negative gold");
  });

  it("has() returns true if balance >= amount", () => {
    const w = new Wallet(100);
    expect(w.has(100)).to.be.true;
    expect(w.has(50)).to.be.true;
    expect(w.has(150)).to.be.false;
  });

  it("toString() returns balance with 'g' suffix", () => {
    const w = new Wallet(85);
    expect(w.toString()).to.equal("85g");
  });
});
