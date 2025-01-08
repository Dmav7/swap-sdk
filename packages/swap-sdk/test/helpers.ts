import fs from "fs";
import nock from "nock";
import path from "path";

import { toJSON } from "../src/utils";

let recording = !!process.env.RECORD;
export function setRecording(enabled: boolean) {
  recording = enabled;
}

const testDir = __dirname;
const nockFixtureDir = path.join(testDir, "fixtures");

const NOCK_RECORDING_FILE = "nock-recordings.json";

export function setupNockBeforeEach(testFilePath: string) {
  if (!nock.isActive()) nock.activate();

  const nockFixturePath = getFixturePath(testFilePath, NOCK_RECORDING_FILE);
  if (fs.existsSync(nockFixturePath)) {
    const nockDefs = nock.loadDefs(nockFixturePath);

    nock.define(
      nockDefs.map((def) => {
        return {
          ...def,
          scope: "https://dummy.com:443",
          options: {
            filteringScope: (_scope) => true,
          },
        };
      }),
    );
  }

  if (recording) {
    nock.recorder.rec({
      dont_print: true,
      output_objects: true,
      enable_reqheaders_recording: false,
    });
  }
}

export function concludeNockAfterEach(testFilePath: string) {
  nock.restore();
  nock.cleanAll();

  if (recording) {
    const nockCallObjects = nock.recorder.play().map((rec) => {
      if (typeof rec !== "string") {
        const { scope, ...recExceptScope } = rec;
        return recExceptScope;
      }
    });
    saveFixture(nockCallObjects, testFilePath, NOCK_RECORDING_FILE);
  }
}

export function serialization(data: any) {
  return JSON.parse(toJSON(data));
}

export function useFixture(
  data: any,
  testFilePath: string,
  filename: string,
  forceRecording = false,
) {
  if (forceRecording || recording) {
    saveFixture(data, testFilePath, filename);
    return data;
  } else {
    return readFixture(testFilePath, filename);
  }
}

function readFixture(testFilePath: string, filename: string) {
  const fixturePath = getFixturePath(testFilePath, filename);

  return fs.existsSync(fixturePath)
    ? JSON.parse(fs.readFileSync(fixturePath, "utf-8"))
    : null;
}

function saveFixture(data: any, testFilePath: string, filename: string) {
  const fixturePath = getFixturePath(testFilePath, filename);
  fs.mkdirSync(path.dirname(fixturePath), { recursive: true });
  fs.writeFileSync(fixturePath, JSON.stringify(data, null, 2));
  console.log("fixture saved to:", fixturePath);
}

function getFixturePath(testFilePath: string, filename: string) {
  return path.join(nockFixtureDir, testFilePath.replace(testDir, ""), filename);
}
