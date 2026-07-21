const minimum = [20, 9, 0];
const current = process.versions.node.split(".").map(Number);

function compareVersions(version, required) {
  for (let index = 0; index < required.length; index += 1) {
    const currentPart = version[index] || 0;
    const requiredPart = required[index];

    if (currentPart > requiredPart) {
      return 1;
    }

    if (currentPart < requiredPart) {
      return -1;
    }
  }

  return 0;
}

if (compareVersions(current, minimum) < 0) {
  console.error(
    `Node.js ${minimum.join(".")} or newer is required. Current: ${process.versions.node}`
  );
  process.exit(1);
}
