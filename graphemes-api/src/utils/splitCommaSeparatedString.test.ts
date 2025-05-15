import { describe, it, expect } from "vitest";

import splitCommaSeparatedString from "./splitCommaSeparatedString";

describe("splitCommaSeparatedString()", () => {
  it("strips whitespace appropriately", () => {
    const emptyStringOutput = splitCommaSeparatedString("");
    expect(emptyStringOutput.length).toBe(0);

    const extraCommasOutput = splitCommaSeparatedString(
      "shíshálh, , Sechelt , "
    );
    expect(extraCommasOutput.length).toBe(2);
    expect(extraCommasOutput[0]).toBe("shíshálh");
    expect(extraCommasOutput[1]).toBe("Sechelt");

    const singleResultOutput = splitCommaSeparatedString(", ᑕᗸᒡ   , ");
    expect(singleResultOutput.length).toBe(1);
    expect(singleResultOutput[0]).toBe("ᑕᗸᒡ");
  });

  it("maintains graphemes equivalency", () => {
    const input =
      "Aitchelitz, BOḰEĆEN, Pauquachin, Chawathil, Cheam Chehalis, Lake Cowichan, Halalt, Katzie, Kwantlen, Kwaw-kwaw-apilt, Kwikwetlem, kʷikʷəƛ̓əm, Leq’a:mel, Lyackson, MÁLEXEȽ, Malahat, Matsqui, Penelakut, Peters, Popkum, Qayqayt, Qualicum, Scia’new, Beecher Bay, Scowlitz, Seabird Island, Shxwhá:y, Shxw’owhamel, Skawahlook, Skowkale, Skwah, Snaw-naw-as, Nanoose, Snuneymuxw, Soowahlie, Squiala, Stz’uminus, Sumas, Tsawwassen, Tsleil-Waututh, Ts'uubaa-asatx, Tzeachten, Union Bar, xʷməθkʷəy̓əm, Musqueam, Yakweakwioose, Yale, Metro Vancouver, Chilliwack, Abbotsford, Nanaimo";
    const output = splitCommaSeparatedString(input);

    expect(output.length).toBe(51);
    expect(output[1]).toBe("BOḰEĆEN");
    expect(output[11]).toBe("kʷikʷəƛ̓əm");
    expect(output[14]).toBe("MÁLEXEȽ");
    expect(output[43]).toBe("xʷməθkʷəy̓əm");
  });
});
