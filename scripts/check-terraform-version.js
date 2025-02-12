/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
const fetch = require("node-fetch"); // @TODO this can be removed once we upgrade to Node 18 and use native fetch

async function getLatestVersion() {
  const response = await fetch("https://api.releases.hashicorp.com/v1/releases/terraform/latest");
  const data = await response.json();
  // console.debug(data);

  return data.version;
}

module.exports = async ({github, context, core}) => {
  const version = await getLatestVersion();
  console.log("latest Terraform version", version);

  core.exportVariable('NEW_TERRAFORM_VERSION', version);
}
