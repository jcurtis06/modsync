// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{path::PathBuf, process::Command};

use tauri::{api::path::app_data_dir, command, AppHandle};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![login, play])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[command]
async fn login(app_handle: AppHandle) -> Result<String, String> {
    println!("Logging in to PortableMC...");

    // Get the APPDATA directory path
    let app_data_path = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get APPDATA directory")?;

    // Construct the full path to the work directory
    let work_dir = app_data_path.join("launcher");

    // Create the work directory if it doesn't exist
    if !work_dir.exists() {
        std::fs::create_dir_all(&work_dir).map_err(|e| e.to_string())?;
    }

    // Path to the Python executable
    let python_path = PathBuf::from("binaries/python/python.exe-x86_64-pc-windows-msvc.exe");

    // Spawn the command asynchronously
    let output = tokio::task::spawn_blocking(move || {
        Command::new(python_path)
            .arg("-m")
            .arg("portablemc")
            .arg("--main-dir")
            .arg(work_dir)
            .arg("login")
            .arg("joecurtis2006@gmail.com")
            .output()
            .map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| e.to_string())??;

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(stdout.into_owned())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(stderr.into_owned())
    }
}

#[command]
async fn play(
    modpack_name: String,
    modpack_loader: String,
    mc_version: String,
    email: String,
    app_handle: AppHandle,
) -> Result<String, String> {
    println!("Playing modpack: {}", modpack_name);

    // Get the APPDATA directory path
    let app_data_path = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or("Failed to get APPDATA directory")?;

    // Construct the full path to the work directory
    let work_dir = app_data_path.join("launcher");

    let profile_dir = app_data_path.join("profiles").join(modpack_name);

    // Create the work directory if it doesn't exist
    if !work_dir.exists() {
        std::fs::create_dir_all(&work_dir).map_err(|e| e.to_string())?;
    }

    // Create the profile directory if it doesn't exist
    if !profile_dir.exists() {
        std::fs::create_dir_all(&profile_dir).map_err(|e| e.to_string())?;
    }

    // Copy the portablemc_auth.json file from the work directory to the profile directory
    let auth_file = work_dir.join("portablemc_auth.json");
    let profile_auth_file = profile_dir.join("portablemc_auth.json");
    if auth_file.exists() && !profile_auth_file.exists() {
        std::fs::copy(&auth_file, &profile_auth_file).map_err(|e| e.to_string())?;
    }

    // Path to the Python executable
    let python_path = PathBuf::from("binaries/python/python.exe-x86_64-pc-windows-msvc.exe");

    // Spawn the command asynchronously
    let output = tokio::task::spawn_blocking(move || {
        Command::new(python_path)
            .arg("-m")
            .arg("portablemc")
            .arg("--main-dir")
            .arg(work_dir)
            .arg("--work-dir")
            .arg(profile_dir)
            .arg("start")
            .arg(modpack_loader + ":" + &mc_version)
            .arg("-l")
            .arg(email)
            .output()
            .map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| e.to_string())??;

    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(stdout.into_owned())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(stderr.into_owned())
    }
}
